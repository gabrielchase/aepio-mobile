import React, { Component } from 'react'
import { Text, TouchableNativeFeedback, View, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Ionicons } from '@expo/vector-icons'

import { CardSection } from './common'

class ListItem extends Component {
    onRowPress() {
        this.props.activate(this.props.device);
        // Actions.deviceDetail({ deviceId: this.props.device })
    }

    render() {
        const id = this.props.device

        const rootContainerStyles = [styles.rootContainer, this.props.active ? styles.rootContainerActive : {}]
        const titleTextStyles = [styles.titleText, this.props.active ? styles.titleTextActive : {}]
        const subtitleTextStyles = [styles.subtitleText, this.props.active ? styles.subtitleTextActive : {}]

        return (
            <TouchableNativeFeedback onPress={this.onRowPress.bind(this)}>
                <View style={rootContainerStyles} pointerEvents='box-only'>
                    <View style={styles.iconContainer}>
                        <Ionicons name="md-wifi" size={24} color="white"/>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={titleTextStyles}>Device {id}</Text>
                        <Text style={subtitleTextStyles}>Home</Text>
                    </View>
                    <View style={styles.actionsContainer}>
                        <Ionicons name="md-more" size={24} color="white"/>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0)'
    },
    rootContainerActive: {
        borderColor: 'white'
    },
    iconContainer: {
        flexGrow: 0,
        padding: 24
    },
    contentContainer: {
        flex: 1,
        paddingTop: 16,
        paddingBottom: 16
    },
    titleText: {
        fontSize: 20,
        color: 'white'
    },
    subtitleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    actionsContainer: {
        flexGrow: 0,
        padding: 24
    },
})

export default ListItem
