import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Add from '../../assets/add.svg'
import { colors } from '../../utils/colors';

const FloatingActionButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Add width="34" heigth="34" />
    </TouchableOpacity>
  );
};

const { width, height } = Dimensions.get('window')

const buttonSize = width * 0.14;
const buttonMargin = 16; // Margen adicional para evitar superposiciones

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: height * 0.02 + buttonMargin,
    right: width * 0.06 + buttonMargin,
    backgroundColor: colors.primaryColor, // Color de fondo del botón flotante
    borderRadius: 30,
    width: buttonSize,
    height: buttonSize,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Elevación para un sombreado en Android
  },
});

export default FloatingActionButton;
