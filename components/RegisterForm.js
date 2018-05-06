import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../actions'
import { View, Text } from 'react-native'

import { Button, Card, CardSection, Input, Spinner } from './common'

class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numberOfContacts: 1,
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            contacts: []
        }
    }

    setDetailKey({ key }, text) {
        let clone = this.state.contacts.slice()
        clone[key] = `${text}:`
        this.setState({ contacts: clone })
    }

    setDetailValue({ key }, text) {
        let clone = this.state.contacts.slice()
        clone[key] = clone[key].split(':')[0] + ':' + text
        this.setState({ contacts: clone })
    }
    
    onRegisterPress() {
        const { email, password, firstName, lastName, contacts } = this.state
        this.props.registerUser({ email, password, firstName, lastName, contacts })
        this.setState({ email: '', password: '', firstName: '', lastName: '', contacts: [] })
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            )
        }
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />
        } 
        
        return (
            <Button onPress={this.onRegisterPress.bind(this)}>
                Register
            </Button>
        )
    }

    render() {
        let contacts = []
        for (let i = 0; i < this.state.numberOfContacts; i++) {
            contacts.push(
                <CardSection key={i}>
                    <Input 
                        onChangeText={(text) => this.setDetailKey({ key: i }, text)}
                        placeholder="Name"
                    />
                    <Input 
                        onChangeText={(text) => this.setDetailValue({ key: i }, text)}
                        placeholder="Contact Number"
                    />
                </CardSection>
            )
        }

        return (
            <View>
                {this.renderError()}
                <CardSection>
                    <Input 
                        label="Email"
                        placeholder="user@email.com"
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                </CardSection>
                
                <CardSection>
                    <Input 
                        label="First Name"
                        placeholder="Juan"
                        onChangeText={(text) => this.setState({ firstName: text })}
                    />
                </CardSection>
                
                <CardSection>
                    <Input 
                        label="Last Name"
                        placeholder="Luna"
                        onChangeText={(text) => this.setState({ lastName: text })}
                    />
                </CardSection>
                
                <CardSection>
                    <Input 
                        secureTextEntry
                        label="Password"
                        placeholder="********"
                        onChangeText={(text) => this.setState({ password: text })}
                    />
                </CardSection>

                <CardSection>
                    <Text>Contact Numbers</Text>
                </CardSection>
                
                {contacts}
                
                <CardSection>
                    <Button onPress={() => this.setState({ numberOfContacts: this.state.numberOfContacts+1 })}>
                        Add Contact
                    </Button>
                </CardSection>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </View>
        )
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

const mapStateToProps = (state) => {
    return {
        error:  state.auth.error,
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps, { registerUser })(RegisterForm)
