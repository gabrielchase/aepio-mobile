import React, { Component } from 'react'
import { Stack, Scene, Router } from 'react-native-router-flux'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import DeviceList from './components/DeviceList'
import DeviceDetail from './components/DeviceDetail'


const RouterComponent = () => {
    return (
        <Router>
            <Stack key="root" hideNavBar>
                <Stack key="auth">
                    <Scene key="login" component={LoginForm} title="Login" initial />
                    <Scene key="register" component={RegisterForm} title="Registration" />
                </Stack>
                <Stack key="main">
                    <Scene key="deviceList" component={DeviceList} title="Device List" initial/>
                    <Scene key="deviceDetail" component={DeviceDetail} title="Device" />
                </Stack>
            </Stack>
        </Router>
    )
}

export default RouterComponent
