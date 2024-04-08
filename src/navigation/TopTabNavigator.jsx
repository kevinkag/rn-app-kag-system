import React from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from '../utils/colors';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = ({ Realizadas, Pendientes, tabNames }) => {
    return (
        <View style={styles.container}>
            <Tab.Navigator
             
                tabBar={(props) => (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabBarContainer}>
                        {tabNames.map((tabName, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.tabItem}
                                onPress={() => props.navigation.navigate(tabName)}
                            >
                                <Text style={styles.tabText}>{tabName}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
            >
                <Tab.Screen
                    name="Realizadas"
                    component={Realizadas}
                />
                <Tab.Screen
                    name="Pendientes"
                    component={Pendientes}
                />
            </Tab.Navigator>
        </View >
    );
};

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        height:height,
        width:width
    },
    tabBarContainer: {
        flexDirection: 'row',
        width: width,
        height: height * 0.08,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: colors.backgroundColor,
        elevation: 2,
        paddingHorizontal: 10, // Añadido para reducir el espacio horizontal
    },
    tabItem: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent'
    },
    tabText: {
        fontSize: 16,
        color: colors.primaryColor,
        fontWeight: 'bold'
    }
});

export default TopTabNavigator;
