import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, Dimensions, Image, StatusBar } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { decodeBarcode } from '../../utils/decodeBarcode';
import useStore from '../../stores';

const BarcodeScanner = ({ setResult, setVisible, visible, onClose, isEmptyValues }) => {

  const { searchProductByName } = useStore()

  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);
  const handleBarcodeScanned = ({ data }) => {
    if (!scanned) {
      setScanned(true);
      setBarcodeData(data);
    }
  };

  useEffect(() => {
    // Aquí puedes agregar cualquier lógica adicional después de escanear el código de barras
    if (barcodeData) {
      console.log('Código de barras escaneado:', barcodeData);
    }
  }, [barcodeData]);

  const resetScanner = () => {
    setScanned(false);
    setBarcodeData(null);
  };


  const scannerRef = useRef(null);

  const onSuccess = (e) => {
    const decodedBarcode = decodeBarcode(e.data);
    if (decodedBarcode) {
      setResult({
        code: e.data,
        decoded: decodedBarcode
      })
      if (isEmptyValues) {
        onClose()
        return
      }
      searchProductByName(e.data)
      setVisible(false);
    } else {
      setResult({
        code: 'nodata',
        decoded: 'nodata'
      })
      setVisible(false);
    }

    scannerRef.current.reactivate(); // Reactivate scanning
    // Aquí puedes agregar lógica adicional si es necesario, como cerrar el modal
  };


  const handleContainerPress = () => {
    setVisible(false);
  };

  const handleContentPress = (event) => {
    event.stopPropagation();
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <TouchableWithoutFeedback onPress={handleContainerPress}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={handleContentPress}>

            <View>
              <RNCamera
                style={styles.camera}
                onBarCodeRead={handleBarcodeScanned}
                captureAudio={false}
              />
              {scanned && (
                <View style={styles.barcodeInfo}>
                  <Text style={styles.barcodeText}>{`Código de barras: ${barcodeData}`}</Text>
                  <Button title="Escanear de nuevo" onPress={resetScanner} />
                </View>
              )}
              {/* <QRCodeScanner
                ref={scannerRef}
                onRead={onSuccess}
                reactivate={true}
                flashMode={RNCamera.Constants.FlashMode.auto}
                fadeIn={false}
                topContent={
                  <Text style={styles.centerText}>
                    Apunta la cámara hacia el código de barras.
                  </Text>
                }
                bottomContent={
                  <TouchableOpacity style={styles.buttonTouchable} onPress={() => setVisible(false)}>
                    <Text style={styles.buttonText}>Cerrar</Text>
                  </TouchableOpacity>
                }
              />
              <Image
                source={require('../../assets/barcode_overlay.png')}
                style={styles.barcodeOverlay}
                resizeMode="contain"
              /> */}
            </View>

          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  innerModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    zIndex: 1000,
    fontSize: 18,
    position: 'absolute',
    top: height * 0.2,
    color: 'white',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 21,
    color: 'white',
  },
  buttonTouchable: {
    padding: 16,
  },
  barcodeOverlay: {
    position: 'absolute',
    top: height * 0.31,
    left: width * 0.1,
    width: width * 0.8,
    height: width * 0.8,
    zIndex: 1,
  },



  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  barcodeInfo: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barcodeText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default BarcodeScanner;
