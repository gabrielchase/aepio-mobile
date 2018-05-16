import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListView, View, Text, Dimensions, ActivityIndicator, TouchableNativeFeedback } from 'react-native'
import { LinearGradient, Svg } from 'expo'
import { Feather } from '@expo/vector-icons'
import { Actions } from 'react-native-router-flux'

import { CardSection, Button } from './common'
import { fetchDevices, fetchDevice, makeActiveDevice } from '../actions'
import ListItem from './ListItem'
import { READING_INTERVAL } from '../const'

class DeviceList extends Component {
    componentWillMount() {
        const { user_id, token } = this.props.user
        this.props.fetchDevices(user_id, token)
        this.createDataSource(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps)
    }

    componentDidMount() {
        const { user_id, token } = this.props.user
        this.timer = setInterval(() => this.props.fetchDevices(user_id, token), READING_INTERVAL)
    }

    createDataSource({ devices }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        
        this.dataSource = ds.cloneWithRows(devices)
    }

    renderRow = (device) => {
        const { id } = this.props.activeDevice
        const active = id == device.id
        return <ListItem device={ device } active={ active }/>
    }

    renderViz = () => {
        const { id, name, recent_reading } = this.props.activeDevice
        const w = Dimensions.get('window').width
        const h = Dimensions.get('window').height
        
        if (recent_reading === undefined) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={48} color='#D46047' />
                    <Svg height={64} width={w} style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                        <Svg.Polygon points={`0,64 ${w},0 ${w},64`} fill="#D46047"/>
                    </Svg>
                </View>
            )
        }

        const LOW = 750
        const MED = 1000
        const HIGH = 1250
        const MAX = 1250
        const KEY = 'lpg'

        const level = (recent_reading[KEY] <= LOW ? 'LOW' : recent_reading[KEY] <= MED ? 'MED' : 'HIGH')
        let percentage = recent_reading[KEY] / MAX
        // cap percentage to an excess offset of 1.3
        if (percentage > 1.3) percentage = 1.3
        const offset = (h - (h * percentage)) / 2

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#D46047', fontSize: 16, fontWeight: '700' }}>Device {id}</Text>
                <Text style={{ color: '#D46047', fontSize: 48, fontWeight: '200' }}>{level}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}>
                    <Text style={{ color: '#D46047', fontSize: 16, fontWeight: '900' }}>
                        {recent_reading['lpg']} ppm
                    </Text>
                    <Text style={{ color: '#D46047', fontSize: 13, fontWeight: '900', marginLeft: 4 }}>LPG</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}>
                    <Text style={{ color: '#D46047', fontSize: 16, fontWeight: '900' }}>
                        {recent_reading['co']} ppm
                    </Text>
                    <Text style={{ color: '#D46047', fontSize: 13, fontWeight: '900', marginLeft: 4 }}>CO</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}>
                    <Text style={{ color: '#D46047', fontSize: 16, fontWeight: '900' }}>
                        {recent_reading['smoke']} ppm
                    </Text>
                    <Text style={{ color: '#D46047', fontSize: 13, fontWeight: '900', marginLeft: 4 }}>SMOKE</Text>
                </View>

                <View style={{ position: 'absolute', bottom: 24, right: 24, width: 64, height: 64, borderRadius: 32, overflow: 'hidden', backgroundColor: 'white', zIndex: 100 }}>
                    <TouchableNativeFeedback onPress={() => Actions.deviceDetail({ deviceId: id })}>
                        <View style={{ padding: 16 }}><Feather name="list" size={32} color="#D46047"/></View>
                    </TouchableNativeFeedback>
                </View>

                <Svg height={h} width={w} style={{ position: 'absolute', top: offset, left: 0, right: 0, zIndex: -100 }}>
                    <Svg.Polygon points={`0,48 ${w},${w} ${w},${h} 0,${h} 0,${w}`} fill="#F3C57B" fillOpacity={0.5}/>
                    <Svg.Polygon points={`${w/2},48 ${w},${w/2} ${w},${h} 0,${h} 0,${w*0.75}`} fill="#D8925A" fillOpacity={0.5}/>
                    <Svg.Polygon points={`${w},0 ${w},${w/2} ${w},${h} 0,${h} 0,${w}`} fill="#DB735C" fillOpacity={0.5}/>
                </Svg>

                <Svg height={64} width={w} style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                    <Svg.Polygon points={`0,64 ${w},0 ${w},64`} fill="#D46047"/>
                </Svg>
            </View>
        )
    }

    render() {
        const { activeDevice } = this.props
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ position: 'absolute', top: 36, right: 12, width: 64, height: 64, borderRadius: 32, overflow: 'hidden', backgroundColor: 'white', zIndex: 100 }}>
                    <TouchableNativeFeedback onPress={() => Actions.userEditForm()}>
                        <View style={{ padding: 19 }}><Feather name="settings" size={24} color="#D46047"/></View>
                    </TouchableNativeFeedback>
                </View>
                { this.renderViz() }
                <LinearGradient colors={["#D46047", "#EAB56B"]} style={{ flexGrow: 0, height: '33%', paddingTop: 12 }}>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                </LinearGradient>
            </View>
        )
    }

    componentWillUnmount() {
        clearInterval(this.timer)
        console.log('unmounting devicelist')
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        devices: state.devices,
        activeDevice: state.activeDevice
    }
}

export default connect(mapStateToProps, { fetchDevices, makeActiveDevice })(DeviceList)
