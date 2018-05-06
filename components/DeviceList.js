import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListView, View, Text } from 'react-native'

import { getUserInfo } from '../actions'

class DeviceList extends Component {
    componentWillMount() {
        const { user_id, token } = this.props.user
        this.props.getUserInfo(user_id, token)
        this.createDataSource(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps)
    }

    createDataSource({ devices }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        
        this.dataSource = ds.cloneWithRows(this.props.userInfo)
    }

    render() {
        return (
            <View>
                <Text>Device 1</Text>
                <Text>Device 2</Text>
                <Text>Device 3</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,   
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps, { getUserInfo })(DeviceList)
