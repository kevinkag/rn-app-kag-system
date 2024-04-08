import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

const LoaderFull = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.primaryColor} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fondo semi-transparente
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LoaderFull;
