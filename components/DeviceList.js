import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListView, View, Text, Dimensions, ActivityIndicator } from 'react-native'
import { LinearGradient, Svg } from 'expo'
import { Actions } from 'react-native-router-flux'

import { CardSection, Button } from './common'
import { fetchDevices, fetchDevice } from '../actions'
import ListItem from './ListItem'

class DeviceList extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount() {
        const { user_id, token } = this.props.user
        this.props.fetchDevices(user_id, token)
        this.createDataSource(this.props)
        this.activateDevice(this.props.devices[0])
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps)
        this.activateDevice(this.props.devices[0])
    }

    createDataSource({ devices }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        
        this.dataSource = ds.cloneWithRows(devices)
    }

    activateDevice = async (device) => {
        this.setState({ loading: true, activeDevice: device })
        fetchDevice(device, this.props.user.token)(response => {
            this.setState({ loading: false, detail: response.payload, activeDevice: device })
        })
    }

    renderRow = (device) => {
        const isActive = this.state.activeDevice === device
        return <ListItem device={ device } active={ isActive } activate={ (device) => { this.activateDevice(device) } } />
    }

    renderViz = () => {
        const w = Dimensions.get('window').width
        const h = Dimensions.get('window').height

        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={48} color='#D46047' />
                    <Svg height={48} width={w} style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                        <Svg.Polygon points={`0,48 ${w},0 ${w},48`} fill="#D46047"/>
                    </Svg>
                </View>
            )
        }

        // scaling/threshold constants
        const LOW = 750
        const MED = 1000
        const HIGH = 1250
        const MAX = 1250
        const KEY = 'lpg'

        const deviceId = this.state.detail ? this.state.detail.id : 0
        let reading = this.state.detail ? this.state.detail.readings[0] : { lpg: 0, smoke: 0, co: 0 }
        // if (deviceId == 3) reading = { lpg: 1000, smoke: 1000, co: 1000 }
        // if (deviceId == 2) reading = { lpg: 1500, smoke: 1500, co: 1500 }
        const level = (reading[KEY] <= LOW ? 'LOW' : reading[KEY] <= MED ? 'MED' : 'HIGH')
        const percentage = reading[KEY] / MAX
        const offset = (h - (h * percentage)) / 2

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#D46047', fontSize: 16, fontWeight: '700' }}>Device {deviceId}</Text>
                <Text style={{ color: '#D46047', fontSize: 48, fontWeight: '200' }}>{level}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}>
                    <Text style={{ color: '#D46047', fontSize: 16, fontWeight: '900' }}>
                        {reading[KEY]} ppm
                    </Text>
                    <Text style={{ color: '#D46047', fontSize: 13, fontWeight: '900', marginLeft: 4 }}>{KEY.toUpperCase()}</Text>
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
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                { this.renderViz() }
                <LinearGradient colors={["#D46047", "#EAB56B"]} style={{ flexGrow: 0, height: '33%', paddingTop: 24 }}>
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
        devices: state.devices
    }
}

export default connect(mapStateToProps, { fetchDevices })(DeviceList)
