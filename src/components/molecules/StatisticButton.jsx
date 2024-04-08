import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SvgIcon from '../atoms/SvgIcon'
import { statistic } from '../../assets'
import { useNavigation } from '@react-navigation/native';


export default function StatisticButton() {

    const navigation = useNavigation()

    const goToStatisticsScreen = () => {
        navigation.navigate('Statistics')
    }



    return (
        <TouchableOpacity style={styles.container} onPress={goToStatisticsScreen}>
            <SvgIcon Svg={statistic} width={24} height={24} />
        </TouchableOpacity>
    )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: width * 0.04,
    }
})