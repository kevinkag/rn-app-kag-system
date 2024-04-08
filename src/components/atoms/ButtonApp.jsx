import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils/colors'

export default function ButtonApp({ onPress, text, style, textStyle, outline, disabled }) {
  return (
    <TouchableOpacity disabled={disabled} style={[!outline ? styles.buttonContainer : styles.buttonContainerOutline, style, disabled && { backgroundColor:'#c7c9c9' },]} onPress={onPress}>
      <Text style={[styles.buttonText, outline && { color: colors.primaryColor }, textStyle]}>{text}</Text>
    </TouchableOpacity>
  )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  buttonContainerOutline: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'trasparent',
    borderColor: colors.primaryColor,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4
  },
  buttonContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  }
})