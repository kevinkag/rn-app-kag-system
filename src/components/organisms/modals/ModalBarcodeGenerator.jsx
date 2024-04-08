import { Dimensions, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect } from 'react'
import Barcode from '@kichiyaki/react-native-barcode-generator'
import { colors } from '../../../utils/colors'

export default function ModalBarcodeGenerator({ isVisible, setIsVisible, barcode }) {

    const format = barcode?.decoded?.format || 'EAN13'


    useEffect(() => {
    }, [barcode])


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
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}>

            <TouchableWithoutFeedback onPress={handleContainerPress}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback onPress={handleContentPress}>
                        <View style={styles.modalContent}>
                            {barcode && (<Barcode
                                format={dsc(format)}
                                value={barcode?.code}
                                text={barcode?.code}
                                textStyle={{ color: colors.fontDarkColor, fontSize: 18 }}
                                style={{ marginBottom: 40 }}
                                maxWidth={Dimensions.get('window').width / 2}
                            />)}

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback >
        </Modal >

    )
}

function dsc(cadena) {
    // Define una expresión regular que coincida con los caracteres especiales que deseas eliminar
    let regex = /[_-]/g;
    // Utiliza el método replace para reemplazar los caracteres especiales por una cadena vacía
    return cadena.replace(regex, '');
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        paddingTop: height * 0.05,
        width: width * 0.94,
        borderRadius: 10,
        alignItems: 'center',
    },
})