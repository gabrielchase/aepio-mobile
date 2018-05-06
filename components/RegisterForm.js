import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

import { Button, Card, CardSection, Input, Spinner } from './common'

class RegisterForm extends Component {
    state = {
        'numberOfContacts': 1
    }

    render() {
        let contacts = []
        for (let i = 0; i < this.state.numberOfContacts; i++) {
            contacts.push(
                <CardSection key={i}>
                    <Input 
                        placeholder="Name"
                    />
                    <Input 
                        placeholder="Contact Number"
                    />
                </CardSection>
            )
        }

        return (
            <View>
                <CardSection>
                    <Input 
                        label="Email"
                        placeholder="user@email.com"
                    />
                </CardSection>
                
                <CardSection>
                    <Input 
                        label="First Name"
                        placeholder="Juan"
                    />
                </CardSection>
                
                <CardSection>
                    <Input 
                        label="Last Name"
                        placeholder="Luna"
                    />
                </CardSection>
                
                <CardSection>
                    <Input 
                        secureTextEntry
                        label="Password"
                        placeholder="********"
                    />
                </CardSection>

                <Text>Contact Numbers</Text>
                
                {contacts}
                
                <CardSection>
                    <Button onPress={() => this.setState({ numberOfContacts: this.state.numberOfContacts+1 })}>
                        Add Contact
                    </Button>
                </CardSection>

                <CardSection>
                    <Button>Register</Button>
                </CardSection>
            </View>
        )
    }
}

export default RegisterForm
