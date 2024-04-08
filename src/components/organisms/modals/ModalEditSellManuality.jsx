import React, { useCallback, useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View, Text, TextInput, TouchableWithoutFeedback, Dimensions } from 'react-native';
import StyledText from '../../templates/StyledText';
import ButtonApp from '../../atoms/ButtonApp';
import StyledView from '../../templates/StyledView';
import SvgIcon from '../../atoms/SvgIcon';
import { down, units, up } from '../../../assets';
import { colors } from '../../../utils/colors';
import { useStore } from '../../../stores';

const ModalEditSellManuality = ({ visible, closeModal, onSubmit, itemToEdit, form }) => {
    const [quantity, setQuantity] = useState(0);
    const [itemFromDB, setItemFromDB] = useState(null)

    const { originalProducts } = useStore()

    useEffect(() => {
        setQuantity(itemToEdit?.units)
        const filtered = originalProducts.filter((item) => item?._id === itemToEdit?.productId)
        setItemFromDB(filtered[0])
        return () => {
            setQuantity(0)
            setItemFromDB(null)
        }
    }, [itemToEdit])

    const onSubmitEdit = () => {
        let newItem = {
            name: itemToEdit?.name,
            sellingPrice: itemToEdit?.sellingPrice,
            productId: itemToEdit?.productId,
            units: quantity,
        }
        onSubmit(newItem)
    }


    const increaseQuantity = () => {
        const newQuantity = quantity + 1;
        if (newQuantity <= itemFromDB?.units) {
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


    const calculateAmountAccordingToTheForm = (maxUnits) => {
        let unitsAvailable
        if (form && itemToEdit) {
            const products = originalProducts.find(product => product._id === itemToEdit.productId)
            const findUnits = form.find((item) => item?.productId === products?._id)
            unitsAvailable = maxUnits - findUnits?.units
        } else {
            unitsAvailable = maxUnits
        }
        return unitsAvailable || maxUnits
    }

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

                            <StyledView ai="center">

                                <StyledView row ai="center">
                                    <StyledView row ai='center' alignSelf="flex-start" style={{ marginRight: 12 }}>
                                        <SvgIcon Svg={units} width={16} height={16} style={{ marginTop: 0 }} />
                                        <StyledText style={[styles.title, { fontSize: 16, color: 'gray' }]}>{calculateAmountAccordingToTheForm(itemFromDB?.units)}</StyledText>
                                    </StyledView>
                                    <StyledText style={styles.title}>{itemToEdit?.name}</StyledText>
                                </StyledView>



                                <StyledView row ai='center' w={50}>
                                    <TouchableOpacity onPress={increaseQuantity} style={styles.button}>
                                        <SvgIcon Svg={up} width={40} height={40} style={{ color: 'white' }} />
                                    </TouchableOpacity>
                                    <TextInput
                                        style={styles.input}
                                        value={quantity?.toString()}
                                        onChangeText={(text) => {
                                            const newValue = parseInt(text) || 0; // Parsea el texto a un número entero, si no es válido, devuelve 0
                                            if (newValue <= itemFromDB?.units) { // Verifica si el nuevo valor no excede el límite
                                                setQuantity(newValue); // Establece el nuevo valor en el estado
                                            }
                                        }}
                                        keyboardType="numeric"
                                    />
                                    <StyledView>

                                        <TouchableOpacity onPress={decreaseQuantity} style={styles.button}>
                                            <SvgIcon Svg={down} width={40} height={40} style={{ color: 'white' }} />
                                        </TouchableOpacity>
                                    </StyledView>
                                </StyledView>

                            </StyledView>
                            <ButtonApp text="Editar" onPress={onSubmitEdit} style={styles.submitButton} />
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
        marginBottom: height * 0.01,
        fontSize: 20,
        fontWeight: '500',
        textTransform: 'capitalize',
    },
    input: {
        fontSize: 55,
        borderRadius: 5,
        marginHorizontal: 10,
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
        color: colors.fontDarkColor
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
        width: width * 0.5,
        alignSelf: 'center'
    },

});

export default ModalEditSellManuality;
