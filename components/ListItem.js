import React, { Component } from 'react'
import { Text } from 'react-native'

import { CardSection } from './common'

class ListItem extends Component {
    render() {
        const id = this.props.device
        return (
            <CardSection>
                <Text style={styles.titleStyle}> Device {id} </Text>
            </CardSection>
        )
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
}

export default ListItem
