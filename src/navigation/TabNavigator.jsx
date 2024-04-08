import { View, Text, Button, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../utils/colors';

import Product from '../assets/Products.svg';
import History from '../assets/history.svg';
import Sell from '../assets/sell.svg';
import HomeScreen from '../components/screens/HomeScreen';
import SaleScreen from '../components/screens/SaleScreen';
import HistorialScreen from '../components/screens/HistorialScreen';
import menu from '../assets/menu.png';
import SvgIcon from '../components/atoms/SvgIcon';
import OrderByButton from '../components/molecules/OrderByButton';
import { createStackNavigator } from '@react-navigation/stack';
import { devolucion, statistic } from '../assets';
import StatisticButton from '../components/molecules/StatisticButton';
import StatisticsScreen from '../components/screens/StatisticsScreen';
import StyledView from '../components/templates/StyledView';
import HomeStack from './Stacks/HomeStack';
import VentasStack from './Stacks/VentasStack';
import BillingStack from './Stacks/BillingStack';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator()




export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: { height: height * 0.06 },
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'white',
        tabBarActiveBackgroundColor: colors.primaryColor,
        tabBarInactiveTintColor: colors.fontDarkColor,
        lazy: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({ route }) => ({
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIcon: ({ focused }) => (
            <View>
              <Product width="24" height="24" style={{ color: focused ? 'white' : colors.fontDarkColor }} />
            </View>
          )
        })}
      />

      <Tab.Screen name="Billing" component={BillingStack}
        options={({ route }) => ({
          title: 'Factura',
          tabBarLabelStyle: { fontSize: 14 }, // Cambia el tamaño del título aquí
          tabBarIcon: ({ focused }) => (
            <View>
              <Sell width="28" height="28" style={{ color: focused ? 'white' : colors.fontDarkColor }} />
            </View>
          )
        })}
      />
      <Tab.Screen name="Sells" component={VentasStack}
        options={{
          title: 'Ventas',
          tabBarLabelStyle: { fontSize: 14 }, // Cambia el tamaño del título aquí
          tabBarIcon: ({ focused }) => (
            <View>
              <History width="28" height="28" style={{ color: focused ? 'white' : colors.fontDarkColor }} />
            </View>
          )
        }} />
    </Tab.Navigator>
  )
}


const getHeaderLeft = (route) => {
  let component
  switch (route.name) {
    case 'Historial':
      component = <></>
      break;
    default:
      component = null;
      break;
  }
  return component
}

const getScreenTitle = (route) => {
  switch (route.state?.routes[route.state.index]?.name) {
    case 'Statistics':
      return 'Estadísticas';
    default:
      return 'Inventario';
  }
};

const shouldShowHeader = (route) => {
  // Verificar si la ruta actual es "Statistics"
  if (route.name === "Home") {
    // Si la ruta es "Statistics", ocultar el encabezado
    return false;
  }
  // Mostrar el encabezado para otras rutas
  return true;
};

const { height, width } = Dimensions.get('window')