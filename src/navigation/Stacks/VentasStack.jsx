import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HistorialScreen from '../../components/screens/HistorialScreen';
import { devolucion } from '../../assets';
import { colors } from '../../utils/colors';
import SvgIcon from '../../components/atoms/SvgIcon';


const Stack = createStackNavigator()


export default function VentasStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: colors.backgroundColor },
            headerTintColor: colors.primaryColor,
            headerTitleAlign: 'center',
            headerTitleStyle: { fontFamily: 'monospace', fontWeight: 'bold' },
        }}>
            <Stack.Screen
                name="Historial"
                component={HistorialScreen}
                options={{
                    title:'Ventas',
                    headerLeft: () =>
                        <TouchableOpacity style={styles.button}>
                            <SvgIcon Svg={devolucion} width={30} height={30} />
                        </TouchableOpacity>,
                }}
            />
        </Stack.Navigator>
    )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    button: {
        marginHorizontal: width * 0.03,
    }
})