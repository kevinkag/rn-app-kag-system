import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SvgIcon from './SvgIcon'
import { add, addproduct } from '../../assets'
import { colors } from '../../utils/colors'

export default function ButtonAdd() {
    return (
        <>
            <TouchableOpacity style={styles.container}>
                <SvgIcon Svg={addproduct} width={24} height={24} styles={{ color: 'white' }} />
            </TouchableOpacity>
        
        </>
    )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        width: width * 0.15,
        height: height * 0.06,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primaryColor,
        elevation: 2,
        borderRadius: 4
    }
})