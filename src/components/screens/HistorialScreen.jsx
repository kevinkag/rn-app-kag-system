import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import BaseTemplate from '../organisms/BaseTemplate'
import HistoryList from '../organisms/HistoryList';
import { useSaleStore } from '../../stores';
import realm from '../../realm';
import { getPendingRequests } from '../../realm/async/RequestPendingAsyncStorage';
import TopTabNavigator from '../../navigation/TopTabNavigator';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { colors } from '../../utils/colors';
import StyledText from '../templates/StyledText';
import { formatDateToString } from '../../utils/functions';




export default function HistorialScreen() {


  const { fetchAllSales, loading, salesState, salesOffline } = useSaleStore()

  const [qrValue, setQRValue] = useState('');
  const [isActive, setIsActive] = useState(false);

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Realizadas' },
    { key: 'second', title: 'Pendientes' },
  ]);


  useEffect(() => {
    fetchAllSales()
  }, [])



  const generateQRCode = () => {
    if (!qrValue) return;

    setIsActive(true);
  };

  const handleInputChange = (text) => {
    setQRValue(text);

    if (!text) {
      setIsActive(false);
    }
  };


  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.primaryColor }}
      style={{ backgroundColor: colors.backgroundColor }}
      labelStyle={{ color: colors.blueGrayColor, fontSize: 16, fontWeight: '500' }}
      activeColor={colors.primaryColor}
    />
  );

  const renderScene = SceneMap({
    first: () => (
      <BaseTemplate>
        <HistoryList salesState={salesState} loading={loading} />
      </BaseTemplate>
    ),
    second: () => (
      <BaseTemplate>
        {salesOffline && salesOffline.length > 0 ? (
          <HistoryList salesState={salesOffline} loading={loading} />
        ) : (
          <StyledText color={'gray'} textAlign='center'>No hay ventas pendientes</StyledText>
        )}

      </BaseTemplate>
    ),
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  wrapper: {
    maxWidth: 300,
    backgroundColor: '#fff',
    borderRadius: 7,
    padding: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  title: {
    fontSize: 21,
    fontWeight: '500',
    marginBottom: 10,
  },
  description: {
    color: '#575757',
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    padding: 17,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498DB',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  qrCode: {
    marginTop: 20,
    alignItems: 'center',
  },
});