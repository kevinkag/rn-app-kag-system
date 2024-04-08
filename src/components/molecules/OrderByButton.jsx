import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils/colors'
import SvgIcon from '../atoms/SvgIcon'
import { orderBy, orderByAsc } from '../../assets'
import {useStore} from '../../stores'

export default function OrderByButton() {

    const { sortProducts, field, searchType, setSearchType } = useStore()
    const [orderByState, setOrderByState] = useState('desc')

    useEffect(() => {
      
    }, [field])
    


    const handleOnPress = (orderByState, field) => {
        setOrderByState((prevState) => {
            return prevState === 'asc' ? 'desc' : 'asc';
        });
        sortProducts(field, orderByState)
    }

    return (
        <TouchableOpacity style={styles.containerButton} onPress={() => handleOnPress(orderByState, field)}>
            <SvgIcon Svg={orderByState === 'desc' ? orderBy : orderByAsc} style={{ color: colors.primaryColor }} width="24" height="24" />
        </TouchableOpacity>
    )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    containerButton: {
        position: 'absolute',
        top: height * 0.02,
        right: width * 0.04,
    },
})