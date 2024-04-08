import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { Children } from 'react'
import { colors } from '../../utils/colors'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function BaseTemplate({children}:any) {
  return (
    <GestureHandlerRootView style={styles.view}>
      
      {children}
    </GestureHandlerRootView>
  )
}

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    view:{
        flex: 1,
        backgroundColor: colors.backgroundColor,
        paddingTop:height*0.01,
        paddingHorizontal:width*0.03,
    }
})