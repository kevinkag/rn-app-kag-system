import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, Dimensions, TouchableWithoutFeedback } from 'react-native';
import StyledView from '../templates/StyledView';
import { colors } from '../../utils/colors';

const CustomToast = ({ type = 'info', text1 = '', text2 = '', visibilityTime = 2000, isVisible, setIsVisible }) => {

  const toastBackgroundColor = getTypeBackgroundColor(type);
  const toastTextColor = getTypeTextColor(type);

  useEffect(() => {
    if (!isVisible) {
      return
    }
    const timer = setTimeout(() => {
      console.log('se cumplio el tiempo')
      setIsVisible(false)
    }, visibilityTime);
    // Limpieza del temporizador al desmontar el componente
    return () => {
      console.log('se desmonto el componente')
      clearTimeout(timer)
      setIsVisible(false)
    };
  }, [isVisible]);

  const onClose = () => {
    setIsVisible(false)
  }

  const handleContainerPress = () => {
    onClose();
  };

  const handleContentPress = (event) => {
    event.stopPropagation();
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType='fade'
      onRequestClose={onClose}
    >

      <TouchableWithoutFeedback onPress={handleContainerPress} >
        <View style={{backgroundColor:'rgba(0,0,0,0.)', height, width}}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={handleContentPress}>

              <View style={[styles.toastContainer, { borderLeftColor: toastBackgroundColor }]}>

                <Text style={[styles.text1]}>{text1}</Text>
                {text2 &&
                  <Text style={[styles.text2]}>{text2}</Text>}
              </View>

            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

  );
};

const getTypeBackgroundColor = (type) => {
  switch (type) {
    case 'success':
      return '#98FB98';
    case 'error':
      return '#FFC0CB';
    case 'info':
      return colors.primaryColor;
    case 'warning':
      return '#FFFFE0';
    default:
      return '#ADD8E6';
  }
};

const getTypeTextColor = (type) => {
  switch (type) {
    case 'success':
    case 'error':
    case 'warning':
      return '#FFFFFF';
    case 'info':
    default:
      return '#000000';
  }
};

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  toastContainer: {
    borderRadius: 5,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: 'white',
    elevation: 5,
    flexDirection: 'column',
    padding: 15,

    paddingLeft: 25,
    height: height * 0.065,
    width: width * 0.8,
    borderLeftWidth: 5,
  },
  text1: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.fontDarkColor
  },
  text2: {
    fontSize: 10,
    color: 'gray'
  },
  modalContainer: {
    top: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  rightLine: {

  }
});

export default CustomToast;
