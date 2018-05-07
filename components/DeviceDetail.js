import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'

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
        const { id, name, readings } = this.props.currentDevice
        return (
            <View>
                <Text> Device Detail </Text>
                <Text> {name} </Text>
                {readings ? this.renderReadings(readings) : <Card></Card>}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        currentDevice: state.currentDevice
    }
}

export default connect(mapStateToProps, { fetchDevice })(DeviceDetail)
