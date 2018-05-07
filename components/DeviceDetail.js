import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'

import { CardSection } from './common'
import { fetchDevice } from '../actions'

class DeviceDetail extends Component {
    componentWillMount() {
        const deviceId  = this.props.deviceId
        const { token } = this.props.user
        this.props.fetchDevice(deviceId, token)
    }

    render() {
        return (
            <View>
                <Text> Device Detail </Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        currentDevice: state.auth.currentDevice
    }
}

export default connect(mapStateToProps, { fetchDevice })(DeviceDetail)
