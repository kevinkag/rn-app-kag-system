import React, { useEffect, useRef, useState } from "react";
import { Button, Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";
import SvgIcon from "./SvgIcon";
import { flashlight } from "../../assets";
import CustomToast from "./CustomToast";
import Toast from "react-native-toast-message";
import {useStore} from "../../stores";

const Scan = ({ visible, setVisible, setResult, products, onClose }) => {

    const { searchProductByName, originalProducts } = useStore()


    const [scanned, setScanned] = useState(false);
    const [barcodeData, setBarcodeData] = useState(null);
    const [flashEnabled, setFlashEnabled] = useState(false);
    const [isVisibleToast, setisVisibleToast] = useState(false)


    const handleBarcodeScanned = (data) => {
        if (!scanned) {
            const barcode = data.barcodes[0]
            // const decodedBarcode = decodeBarcode(data);
            const filteredData = originalProducts.find((product) => product?.barcode?.code === barcode?.data)
            if (filteredData) {
                searchProductByName(barcode?.data)
                Toast.show({
                    type: 'info',
                    text1: 'Escaneo exitoso',
                    text2: `Se ha encontrado registrado: ${filteredData?.name}`,
                    visibilityTime: 3000,
                });
                setVisible(false)
                onClose()
            } else {
                setResult({
                    code: barcode?.data,
                    decoded: barcode
                })
                if (barcode?.data) {
                    onClose(false)
                }
            }
            setBarcodeData(null);
        }
    };



    useEffect(() => {
        if (scanned) {
            resetScanner();
        }
    }, [barcodeData]);

    const resetScanner = () => {
        setScanned(false);
        setBarcodeData(null);
    };

    const toggleFlash = () => {
        setFlashEnabled(!flashEnabled);
    };



    return (
        <><Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.container}>
                <RNCamera
                    style={styles.camera}
                    // onBarCodeRead={handleBarcodeScanned}
                    captureAudio={false}
                    autoFocus={true}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onGoogleVisionBarcodesDetected={handleBarcodeScanned}
                    googleVisionBarcodeMode={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeMode.ALTERNATE}
                    flashMode={flashEnabled ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off} />
                <Image
                    source={require('../../assets/barcode_overlay.png')}
                    style={styles.barcodeOverlay}
                    resizeMode="contain" />
                <View style={[styles.borders, styles.bordersTop]}>
                    <Text style={styles.text}>
                        Escanear código de barras
                    </Text>
                </View>
                <View style={[styles.borders, styles.bordersBottom]}>
                    <Text style={styles.text}>
                        Cancelar
                    </Text>
                </View>
                <TouchableOpacity style={styles.flashlight} onPress={toggleFlash}>
                    <SvgIcon Svg={flashlight} width={40} height={40} />
                </TouchableOpacity>
                {
                    isVisibleToast && <CustomToast type="info" text1="Redireccionando" text2="Se encontro un producto" visibilityTime={3000} />
                }
            </View>
        </Modal>
        </>
    )
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
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
    barcodeOverlay: {
        position: 'absolute',
        top: height * 0.31,
        left: width * 0.1,
        width: width * 0.8,
        height: width * 0.8,
        zIndex: 10,
    },
    borders: {
        position: 'absolute',
        width: '100%',
        height: height * 0.20,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    bordersTop: {
        top: 0,
    },
    bordersBottom: {
        bottom: 0,
    },
    flashlight: {
        bottom: height * 0.25,
        backgroundColor: 'rgba(0,0,0,0)',

    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
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

export default Scan;
