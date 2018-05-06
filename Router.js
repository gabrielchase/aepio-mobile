import React, { Component } from 'react'
import { Stack, Scene, Router } from 'react-native-router-flux'

import LoginForm from './components/LoginForm'
import DeviceList from './components/DeviceList'

const RouterComponent = () => {
    return (
        <Router>
            <Stack key="root">
                <Scene key="login" component={LoginForm} title="Please Login" initial />
                <Scene key="deviceList" component={DeviceList} title="Device List" />
            </Stack>
        </Router>
    )
}

export default RouterComponent
