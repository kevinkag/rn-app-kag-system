import React from 'react';
import { StyleSheet } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { colors } from '../utils/colors';

const CustomTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.tabBar}
    labelStyle={styles.label}
    tabStyle={styles.tab}
  />
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.backgroundColor,
  },
  indicator: {
    backgroundColor: colors.primaryColor, // Color del indicador de tab activo
  },
  label: {
    color: colors.fontDarkColor, // Color del texto de las etiquetas de tab
    fontWeight: 'bold',
    fontSize: 16,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default CustomTabBar;
