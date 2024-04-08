import { Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import { colors } from '../../utils/colors';
import SaleScreen from '../../components/screens/SaleScreen';


const Stack = createStackNavigator()


export default function BillingStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: colors.backgroundColor },
            headerTintColor: colors.primaryColor,
            headerTitleAlign: 'center',
            headerTitleStyle: { fontFamily: 'monospace', fontWeight: 'bold' },
        }}>
            <Stack.Screen
                name="Bill"
                component={SaleScreen}
                options={{
                    title:'Factura'
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