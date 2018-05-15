import React from 'react'
import { Text, TouchableNativeFeedback, View, ActivityIndicator } from 'react-native'

const Button = ({ onPress, loading, children }) => {
  const { buttonStyle, textStyle } = styles

  let inner;
  if (loading) {
    inner = (
      <ActivityIndicator size={32} color="#D46047" style={{ padding: 8 }}>
      </ActivityIndicator>
    );
  } else {
    inner = (
      <Text style={textStyle}>
        {children}
      </Text>
    );
  }

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={buttonStyle}>
        { inner }
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#D46047',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    height: 48,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 50
  }
}

export { Button }
