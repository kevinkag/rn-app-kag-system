import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import { colors } from './src/utils/colors';
import Toast from 'react-native-toast-message';
import { useSaleStore } from './src/stores';
import { deleteSaleOfflineRealm } from './src/realm/sales/salesService';
import useNetworkStatus from './src/hooks/useNetworkStatus';
import realm from './src/realm';

function App() {

  const { makeSaleFromSaleOffline } = useSaleStore()
  const isConnected = useNetworkStatus()


 
  useEffect(() => {
    makeSaleFromSaleOffline()
    // deleteSaleOfflineRealm()
    // Cambiar el color de la barra de estado
    StatusBar.setBackgroundColor(colors.backgroundColor); // Establece el color de fondo de la barra de estado
    StatusBar.setBarStyle('dark-content'); // Establece el estilo de los iconos de la barra de estado (por ejemplo, oscuros)
  }, [isConnected]);
  
  return (
    <>
      <NavigationContainer>
        <TabNavigator />

      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
