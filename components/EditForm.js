import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserInfo, updateUser } from '../actions'
import { View, Text } from 'react-native'

import { Button, Card, CardSection, Input, Spinner } from './common'

class EditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numberOfContacts: 1,
            contacts: [],
            email: '',
            first_name: '',
            last_name: '',
            password: ''
        }
    }
    async componentWillMount() {
        const { user_id, token } = this.props.user
        await this.props.getUserInfo(user_id, token)

        const { email, first_name, last_name } = this.props.user_info

        this.setState({ email: email, first_name: first_name, last_name: last_name})

        let contacts = this.props.user_info.details.contacts
        let updatedContacts = []
        
        this.setState({ numberOfContacts: Object.keys(contacts).length })
        for (let key in contacts) {
            updatedContacts.push(`${key}:${contacts[key]}`)
        }
        this.setState({ contacts: updatedContacts })
    }

    async registerForPushNotification() {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        let finalStatus = existingStatus
        
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
            finalStatus = status
        }
        
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return
        }
        
        // Get the token that uniquely identifies this dsevice
        let expo_token = await Notifications.getExpoPushTokenAsync()
        this.setState({ expo_token: expo_token })
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
    
    onUpdatePress() {
        const { user_id, token } = this.props.user
        const { email, password, first_name, last_name, contacts } = this.state
        this.props.updateUser(email, password, first_name, last_name, contacts, user_id, token)
        this.props.registerUser({ email, password, firstName, lastName, contacts, expo_token })
        this.setState({ email: '', password: '', firstName: '', lastName: '', contacts: [], expo_token: '' })
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
            <Button onPress={this.onUpdatePress.bind(this)}>
                Update
            </Button>
        )
    }

    renderEditForm() {
        const { email, first_name, last_name, details } = this.props.user_info
        let contacts = []
        if (this.state.contacts.length) {
            for (let i = 0; i < this.state.numberOfContacts; i++) {
                let contact = this.state.contacts[i]
                let splitContact = contact.split(':')
                let name = splitContact[0]
                let number = splitContact[1]
                contacts.push(
                    <CardSection key={i}>
                        <Input 
                            onChangeText={(text) => this.setDetailKey({ key: i }, text)}
                            placeholder="Name"
                            value={name}
                        />
                        <Input 
                            onChangeText={(text) => this.setDetailValue({ key: i }, text)}
                            placeholder="Contact Number"
                            value={number}
                        />
                    </CardSection>
                )
            }   
        }
        
        
        return (
            <View>
                <View><Text>Edit User Details</Text></View>
                {this.renderError()}
                <CardSection>
                    <Input 
                        label="Email"
                        placeholder="user@email.com"
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                </CardSection>
                
                <CardSection>
                    <Input 
                        label="First Name"
                        placeholder="Juan"
                        value={this.state.first_name}
                        onChangeText={(text) => this.setState({ first_name: text })}
                    />
                </CardSection>
                
                <CardSection>
                    <Input 
                        label="Last Name"
                        placeholder="Luna"
                        value={this.state.last_name}
                        onChangeText={(text) => this.setState({ last_name: text })}
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

    render() {
        if (this.props.user_info) {
            return this.renderEditForm()
        } else {
            return (
                <View><Text>Loading...</Text></View>
            )
        }
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
        user: state.auth.user,
        user_info: state.auth.user_info,
        error:  state.auth.error,
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps, { getUserInfo, updateUser })(EditForm)
