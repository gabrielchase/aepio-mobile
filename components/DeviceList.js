import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListView, View, Text } from 'react-native'

import { CardSection } from './common'
import { fetchDevices } from '../actions'
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
        console.log('createDataSource: ', devices)
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        
        this.dataSource = ds.cloneWithRows(devices)
    }

    renderRow(device) {
        return <ListItem device={device} />
    }

    render() {
        const { user } = this.props
        return (
            <View>
                <CardSection>
                    <Text> Welcome {user.email}</Text>
                </CardSection>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
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
