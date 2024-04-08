import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import SvgIcon from './SvgIcon';
import { codebar } from '../../assets';
import { colors } from '../../utils/colors';
import BarcodeScanner from './BarcodeScanner';

export default function CodeBarButton({setScannerVisible, isScannerVisible}) {


  const handleScanButtonClick = () => {
    setScannerVisible(true);
  };

  return (
    <View style={styles.container}>
            <Text style={styles.text}>Escanear código de barras</Text>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleScanButtonClick} >
        <SvgIcon Svg={codebar} width={38} height={38} style={{ color: 'black' }} />
      </TouchableOpacity>
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: width*0.00,
    left: width*0.00,
    width:width,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'space-around',
    padding:height*0.03
  },
  buttonContainer: {
    backgroundColor: colors.primaryColor,
    borderRadius: 35,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    elevation:2
  },
  text:{
    fontWeight:'bold',
    color:'gray',
    fontStyle:'italic',
    
  }
});
