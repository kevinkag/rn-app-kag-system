import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

export default function DoubleButtons({ onPressOne }) {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.outlineButton]} onPress={() => onPressOne('cancel')}>
        <Text style={[styles.buttonText, styles.outlineButtonText]}>Borrar Venta</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onPressOne('done')}>
        <Text style={styles.buttonText}>Realizado</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: height * 0.132,
    right: width * 0.00,
    left: width * 0.00,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButton: {
    backgroundColor: 'white',
    borderWidth: 3,
    fontSize: 16,
    fontWeight: 'bold',
    borderColor: colors.primaryColor,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,

    fontWeight: 'bold',
  },
  outlineButtonText: {
    color: colors.primaryColor,
  },
});
