import React, { Component } from 'react'
import { Stack, Scene, Router } from 'react-native-router-flux'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import DeviceList from './components/DeviceList'
import DeviceDetail from './components/DeviceDetail'
import EditForm from './components/EditForm'

const RouterComponent = () => {
    return (
        <Router>
            <Stack key="root">
                <Stack key="auth">
                    <Scene hideNavBar key="login" component={LoginForm} title="Login" initial />
                    <Scene hideNavBar key="register" component={RegisterForm} title="Registration" />
                </Stack>
                <Stack key="main">
                    <Scene hideNavBar key="deviceList" component={DeviceList} title="Device List" initial />
                    <Scene hideNavBar key="deviceDetail" component={DeviceDetail} title="Device" />
                    <Scene hideNavBar key="userEditForm" component={EditForm} title="Update Details" />
                </Stack>
            </Stack>
        </Router>
    )
}

export default RouterComponent
