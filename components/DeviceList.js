import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListView, View, Text, Dimensions, ActivityIndicator } from 'react-native'
import { LinearGradient, Svg } from 'expo'
import { Actions } from 'react-native-router-flux'

import { CardSection, Button } from './common'
import { fetchDevices, fetchDevice, makeActiveDevice } from '../actions'
import ListItem from './ListItem'

class DeviceList extends Component {
    componentWillMount() {
        const { user_id, token } = this.props.user
        this.props.fetchDevices(user_id, token)
        this.createDataSource(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps)
    }

    createDataSource({ devices }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        
        this.dataSource = ds.cloneWithRows(devices)
    }

    renderRow = (device) => {
        return <ListItem device={ device } />
    }

    renderViz = () => {
        const { id, name, recent_reading } = this.props.activeDevice
        const w = Dimensions.get('window').width
        const h = Dimensions.get('window').height
        
        if (recent_reading === undefined) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={48} color='#D46047' />
                    <Svg height={48} width={w} style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                        <Svg.Polygon points={`0,48 ${w},0 ${w},48`} fill="#D46047"/>
                    </Svg>
                </View>
            )
        }

        const LOW = 750
        const MED = 1000
        const HIGH = 1250
        const MAX = 1250

        const deviceId = this.props.activeDevice.id 
        const level = (recent_reading['lpg'] <= LOW ? 'LOW' : recent_reading['lpg'] <= MED ? 'MED' : 'HIGH')
        const percentage = recent_reading['lpg'] / MAX
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
                
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}>
                    <Button onPress={() => Actions.deviceDetail({ deviceId: deviceId })}> See History </Button>
                </View>

                <Svg height={h} width={w} style={{ position: 'absolute', top: offset, left: 0, right: 0, zIndex: -100 }}>
                    <Svg.Polygon points={`0,48 ${w},${w} ${w},${h} 0,${h} 0,${w}`} fill="#F3C57B" fillOpacity={0.5}/>
                    <Svg.Polygon points={`${w/2},48 ${w},${w/2} ${w},${h} 0,${h} 0,${w*0.75}`} fill="#D8925A" fillOpacity={0.5}/>
                    <Svg.Polygon points={`${w},0 ${w},${w/2} ${w},${h} 0,${h} 0,${w}`} fill="#DB735C" fillOpacity={0.5}/>
                </Svg>

                <Svg height={48} width={w} style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                    <Svg.Polygon points={`0,48 ${w},0 ${w},48`} fill="#D46047"/>
                </Svg>
            </View>
        )
    }

    render() {
        const { activeDevice } = this.props
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                { this.renderViz() }
                <LinearGradient colors={["#D46047", "#EAB56B"]} style={{ flexGrow: 0, height: '45%', paddingTop: 24 }}>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                    {/* TODO: Move this somewhere else (sidebar menu?) */}
                    <Button onPress={() => Actions.userEditForm()}>
                        Update Profile
                    </Button>
                </LinearGradient>
            </View>
        )
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
