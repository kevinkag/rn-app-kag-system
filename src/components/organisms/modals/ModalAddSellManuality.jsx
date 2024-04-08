import React, { useCallback, useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View, Text, TextInput, TouchableWithoutFeedback, Dimensions } from 'react-native';
import StyledText from '../../templates/StyledText';
import ButtonApp from '../../atoms/ButtonApp';
import StyledView from '../../templates/StyledView';
import SvgIcon from '../../atoms/SvgIcon';
import { down, units, up } from '../../../assets';
import { colors } from '../../../utils/colors';

const ModalAddSellManuality = ({ visible, handleStateForm, closeModal, itemInfo }) => {
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        setQuantity(0)
    }, [itemInfo])

    const onSubmitAdd = () => {
        let newItem = {
            name: itemInfo?.name,
            sellingPrice: itemInfo?.sellingPrice,
            productId: itemInfo?._id,
            units: quantity,
        }
        handleStateForm(newItem)
        closeModal()
    }


    const increaseQuantity = () => {
        console.log(itemInfo?.units, quantity)
        const newQuantity = quantity + 1;
        if (newQuantity <= itemInfo.units) {
            setQuantity(newQuantity);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handleContainerPress = () => {
        closeModal();
    };

    const handleContentPress = (event) => {
        event.stopPropagation();
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}>

            <TouchableWithoutFeedback onPress={handleContainerPress}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback onPress={handleContentPress}>
                        <View style={styles.modalContent}>

                            <StyledView row ai='center'>
                                <StyledView row ai='center' style={{ marginRight: 12 }}>
                                    <SvgIcon Svg={units} width={16} height={16} style={{ marginTop: -4 }} />
                                    <StyledText style={[styles.title, { fontSize: 16, color: 'gray' }]}>{itemInfo?.units}</StyledText>
                                </StyledView>

                                <StyledText style={styles.title}>{itemInfo?.name}</StyledText>
                            </StyledView>



                            <StyledView row jc={"space-between"} style={{}}>
                                <TextInput
                                    style={styles.input}
                                    value={quantity.toString()}
                                    onChangeText={(text) => {
                                        const newValue = parseInt(text) || 0; // Parsea el texto a un número entero, si no es válido, devuelve 0
                                        if (newValue <= itemInfo?.units) { // Verifica si el nuevo valor no excede el límite
                                            setQuantity(newValue); // Establece el nuevo valor en el estado
                                        }
                                    }}
                                    keyboardType="numeric"
                                />
                                <StyledView style={{ position: 'absolute', right: width * 0.08, }}>
                                    <TouchableOpacity onPress={increaseQuantity} style={styles.button}>
                                        <SvgIcon Svg={up} width={40} height={40} style={{ color: 'white' }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={decreaseQuantity} style={styles.button}>
                                        <SvgIcon Svg={down} width={40} height={40} style={{ color: 'white' }} />
                                    </TouchableOpacity>
                                </StyledView>
                            </StyledView>
                            <ButtonApp text="Agregar" onPress={onSubmitAdd} style={styles.submitButton} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback >

        </Modal>
    );
};

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        paddingVertical: height * 0.01,
        width: width * 0.9,
        paddingHorizontal: width * 0.02,
        borderRadius: 10,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 16,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        textAlign: 'center',
        marginBottom: height * 0.01,
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    input: {
        fontSize: 55,
        borderRadius: 5,
        padding: 8,
        marginHorizontal: 10,
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
        color:colors.fontDarkColor
    },
    button: {
        backgroundColor: colors.primaryColor,
        padding: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    submitButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: height * 0.03,
        width: width * 0.7,
        alignSelf: 'center'
    },

});

export default ModalAddSellManuality;
