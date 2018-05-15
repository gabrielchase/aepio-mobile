import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextInput, View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { LinearGradient } from 'expo'
import { Feather } from '@expo/vector-icons'

import { emailChanged, passwordChanged, loginUser } from '../actions'
import { Button, Card, CardSection, Spinner } from './common'

class LoginForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text)
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text)
    }

    onLoginPress() {
        const { email, password } = this.props
        this.props.loginUser({ email, password })
    }
    
    renderError() {
        if (this.props.error) {
            return (
                <View style={{ padding: 12 }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            )
        }
    }

    render() {
        return (
            <View>
                <LinearGradient
                    colors={["#D46047", "#EAB56B"]}
                    style={{ height: "100%", width: "100%", padding: 24, justifyContent: "center" }}>
                    <View style={{ height: 128, alignItems: "center" }}>
                        <Feather name="triangle" size={64} color="white"/>
                        <Text style={{ color: "white", fontSize: 28, fontWeight: 'bold' }}>aerio</Text>
                    </View>
                    <View style={{ height: 256 }}>
                        <View style={styles.inputField}>
                            <Feather style={styles.inputIcon} name="user" size={20} color="white"/>
                            <TextInput
                                style={styles.input}
                                placeholder="user@email.com"
                                onChangeText={this.onEmailChange.bind(this)}
                                value={this.props.email}
                                selectionColor="#efc78f"
                                keyboardType="email-address"
                                underlineColorAndroid="rgba(255,255,255,0.5)"
                            />
                        </View>
                        <View style={styles.inputField}>
                            <Feather style={styles.inputIcon} name="lock" size={20} color="white"/>
                            <TextInput
                                secureTextEntry
                                style={styles.input}
                                placeholder="********"
                                onChangeText={this.onPasswordChange.bind(this)}
                                value={this.props.password}
                                underlineColorAndroid="rgba(255,255,255,0.5)"
                            />
                        </View>
                        {this.renderError()}
                        <Button onPress={this.onLoginPress.bind(this)} loading={this.props.loading}>
                            Login
                        </Button>
                        <Button onPress={() => Actions.register()}>
                            Register
                        </Button>
                    </View>
                </LinearGradient>
            </View>
        )
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    inputField: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputIcon: {
        flexGrow: 0,
        padding: 10
    },
    input: {
        flex: 1,
        width: '100%',
        height: 48,
        fontSize: 20,
        padding: 10,
        color: 'white'
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error:  state.auth.error,
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps, { 
    emailChanged, passwordChanged, loginUser 
})(LoginForm)
