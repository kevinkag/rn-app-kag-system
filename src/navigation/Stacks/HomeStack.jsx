import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HomeScreen from '../../components/screens/HomeScreen'
import StatisticsScreen from '../../components/screens/StatisticsScreen'
import { createStackNavigator } from '@react-navigation/stack';
import OrderByButton from '../../components/molecules/OrderByButton';
import { colors } from '../../utils/colors';
import StatisticButton from '../../components/molecules/StatisticButton';
import SvgIcon from '../../components/atoms/SvgIcon';
import { back } from '../../assets';


const Stack = createStackNavigator()

export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{

            headerStyle: { backgroundColor: colors.backgroundColor },
            headerTintColor: colors.primaryColor,
            headerTitleAlign: 'center',
            headerTitleStyle: { fontFamily: 'monospace', fontWeight: 'bold' },
        }}>
            <Stack.Screen
                name="Inventario"
                component={HomeScreen}
                options={{
                    headerRight: () => <OrderByButton />,
                    headerLeft: () => <StatisticButton />,
                }}
            />
            <Stack.Screen
                name="Statistics"
                component={StatisticsScreen}
                options={({ route, navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                            <SvgIcon Svg={back} width={28} height={28} style={{ color: colors.primaryColor }} />
                        </TouchableOpacity>
                    ),
                    title: 'Informe financiero'
                })} />
        </Stack.Navigator>
    )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    button: {
        marginHorizontal: width * 0.03,
    }
})