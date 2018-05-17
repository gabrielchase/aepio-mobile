import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, ActivityIndicator, ScrollView, TouchableNativeFeedback } from 'react-native'
import { LinearGradient } from 'expo'
import { Feather } from '@expo/vector-icons'
import { Actions } from 'react-native-router-flux'

import { Card, CardSection } from './common'
import { fetchDevice } from '../actions'
import { READING_INTERVAL } from '../const'

class DeviceDetail extends Component {
    componentWillMount() {
        const deviceId  = this.props.deviceId
        const { token } = this.props.user
        this.props.fetchDevice(deviceId, token)
    }

    componentDidMount() {
        const deviceId  = this.props.deviceId
        const { token } = this.props.user
        this.timer = setInterval(() => this.props.fetchDevice(deviceId, token), READING_INTERVAL)
    }

    renderReadings(readings) {
        let renderReadings = []
        for (let reading of readings) {
            renderReadings.push(
                <Card key={reading.id}>
                    <CardSection>
                        <Text>Timestamp: {reading.timestamp}</Text>
                    </CardSection>
                    
                    <CardSection>
                        <Text>LPG: {reading.lpg}</Text>
                    </CardSection>
                    
                    <CardSection>
                        <Text>CO: {reading.co}</Text>
                    </CardSection>
                    
                    <CardSection>
                        <Text>SMOKE: {reading.smoke}</Text>
                    </CardSection>
                </Card>
            )
        }
        return renderReadings
    }

    render() {
        const readings = this.props.currentDevice
        const { id, name } = this.props.activeDevice
        console.log('reloading devicedetails ', id)
        const deviceId = id

        if (!readings.length) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={48} color='#D46047'/>
                </View>
            )
        }

        return (
            <View>
                <LinearGradient
                    colors={['#D46047', '#EAB56B']}
                    style={{ height: '100%', width: '100%', justifyContent: 'center' }}>

                    <View style={{ flexGrow: 0, flexDirection: 'row', marginTop: 24 }}>
                        <View style={{ flexGrow: 0 }}>
                            <TouchableNativeFeedback onPress={() => { Actions.deviceList() }}>
                                <View style={{ padding: 16 }} pointerEvents='box-only'>
                                    <Feather name="arrow-left" size={24} color='white' />
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <Text style={{ flex: 1, padding: 16, fontSize: 20, fontWeight: '700', color: 'white' }}>Device {deviceId} Readings</Text>
                    </View>

                    <ScrollView style={{ flex: 1, padding: 16 }}>
                        {this.renderReadings(readings)}
                    </ScrollView>
                </LinearGradient>
            </View>
        )
    }

    componentWillUnmount() {
        clearInterval(this.timer)
        console.log('unmounting devilcedetails')
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        currentDevice: state.currentDevice,
        activeDevice: state.activeDevice
    }
}

export default connect(mapStateToProps, { fetchDevice })(DeviceDetail)
