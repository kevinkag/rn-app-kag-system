import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import ButtonApp from '../atoms/ButtonApp';
import IconInput from '../atoms/IconInput';
import StyledView from '../templates/StyledView';
import { colors } from '../../utils/colors';
import { codebar, down, up } from '../../assets';
import SvgIcon from '../atoms/SvgIcon';
import BarcodeScanner from '../atoms/BarcodeScanner';
import InputImage from '../atoms/InputImage';
import {useStore} from '../../stores';
import Scan from '../atoms/Scan';

const ModalEditProduct = ({ visible, onClose, onSubmit, product, setProduct }) => {

    const { updateProductByIdAsync } = useStore()
    const [form, setForm] = useState(null);

    const [modalBarCodeVisible, setModalBarCodeVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [linkImagen, setLinkImagen] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({
        name: false,
        costPrice: false,
        sellingPrice: false,
        units: false,
    });

    useEffect(() => {
        setForm({
            name: product && product.name ? product.name : '',
            costPrice: product && product.costPrice ? product.costPrice.toString() : '', // Convertir a cadena de texto
            sellingPrice: product && product.sellingPrice ? product.sellingPrice.toString() : '', // Convertir a cadena de texto
            units: product && product.units ? product.units.toString() : '', // Convertir a cadena de texto
            image: product?.image || '',
            barcode: product?.barcode || ''
        })
       return () => {
        setForm(null)
       }
    }, [product])







    const handleChange = (key, value) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

    const handleSubmit = () => {
        const requiredFields = ['name', 'costPrice', 'sellingPrice', 'units'];
        const newErrors = {};
        let hasError = false;


        requiredFields.forEach(field => {
            if (!form[field]) {
                newErrors[field] = true;
                hasError = true;
            }
        });

        if (hasError) {
            setErrors(newErrors);
        } else {
            const formData = {
                ...form,
                image: linkImagen || form?.image
            };
            //productstore
            updateProductByIdAsync(product?._id, formData);
            //////////////
            onClose();
            setForm({
                name: '',
                costPrice: '',
                sellingPrice: '',
                units: '',
                barcode: '',
            });

            setImagePreview(null);
            setLinkImagen('');
            setErrors({
                name: false,
                costPrice: false,
                sellingPrice: false,
                units: false,
            });
        }
    };

    const handleContainerPress = () => {
        onClose();
    };

    const handleContentPress = (event) => {
        event.stopPropagation();
    };


    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleSubmitImage = (formData) => {
        // Handle image submission
    };

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const fetchImageFromUrl = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            setImagePreview(URL.createObjectURL(blob));
        } catch (error) {
            console.error('Error fetching image:', error);
            setImagePreview(null);
        }
    };


    return (
        <><Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={handleContainerPress}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback onPress={handleContentPress}>
                        <View style={styles.modalContent}>
                            <Text style={styles.header}>Editar Producto</Text>
                            <StyledView w={85}>
                                <TextInput
                                    style={[styles.input, errors.name && styles.errorBorder]}
                                    placeholder="Nombre del Producto"
                                    value={form?.name}
                                    onChangeText={(text) => handleChange('name', text)} />
                            </StyledView>
                            <StyledView w={85} mt={1} row jc='space-between'>
                                <IconInput
                                    style={[styles.input, errors.costPrice && styles.errorBorder, { width: width * 0.4 }]}
                                    placeholder="Costo"
                                    keyboardType="numeric"
                                    icon={down}
                                    value={form?.costPrice}
                                    onChangeText={(text) => handleChange('costPrice', text)}
                                    colorIcon={colors.pastelRedColor} />
                                <IconInput
                                    style={[styles.input, errors.sellingPrice && styles.errorBorder, { width: width * 0.4 }]} placeholder="Venta"
                                    icon={up}
                                    keyboardType="numeric"
                                    value={form?.sellingPrice}
                                    onChangeText={(text) => handleChange('sellingPrice', text)}
                                    colorIcon={colors.pastelGreenColor} />
                            </StyledView>
                            <StyledView w={85} mt={1}>
                                <TextInput
                                    style={[styles.input, errors.units && styles.errorBorder]}
                                    placeholder="Cantidad"
                                    keyboardType="numeric"
                                    value={form?.units}
                                    onChangeText={(text) => handleChange('units', text)} />
                            </StyledView>
                            <StyledView w={85} mt={1}>
                                <ButtonApp text="Subir imagen" outline onPress={handleOpenModal} style={{ elevation: 1, borderRadius: 4, height: height * 0.06 }} />
                                <InputImage
                                    visible={modalVisible}
                                    onClose={handleCloseModal}
                                    onSubmit={handleSubmitImage}
                                    setLinkImagen={setLinkImagen} />

                                {
                                    form?.image && (<StyledView mt={1}>
                                        <Image source={{ uri: form?.image }} style={styles.imagePreview} />

                                    </StyledView>)
                                }

                            </StyledView>
                            <StyledView row w={85} mt={2}>
                                <TextInput
                                    style={[styles.input, { borderRightWidth: 0, borderTopEndRadius: 0, borderEndEndRadius: 0, width: width * 0.71, color: 'gray' }]}
                                    placeholder="Código de Barras"
                                    placeholderTextColor={'gray'}
                                    keyboardType="numeric"
                                    editable={false}
                                    value={form?.barcode.code}
                                    onChangeText={(text) => handleChange('barcode', text)} />
                                <StyledView w={14} h={6} jc='center' ai='center' style={styles.iconContainer}>
                                    <TouchableOpacity onPress={() => setModalBarCodeVisible(true)}>
                                        <SvgIcon Svg={codebar} width={35} height={35} />
                                    </TouchableOpacity>
                                </StyledView>
                            </StyledView>
                            <StyledView w={85} mt={2} row jc='space-around'>
                                <ButtonApp text="Cancelar" style={{ width: width * 0.25 }} onPress={handleContainerPress} />
                                <ButtonApp text="Guardar" style={{ width: width * 0.25 }} onPress={handleSubmit} />
                            </StyledView>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
            <Scan
                visible={modalBarCodeVisible}
                onClose={setModalBarCodeVisible}
                setVisible={(ok) => console.log(ok)}
                setResult={(text) => handleChange('barcode', text)}
            />

        </>
    );
};

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
        padding: 20,
        width: width * 0.94,
        borderRadius: 10,
        alignItems: 'center',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.primaryColor,
    },
    input: {
        height: height * 0.06,
        color: colors.fontDarkColor,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '100%',
    },
    iconContainer: {
        backgroundColor: colors.primaryColor,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderColor: '#b2b2b2',
        borderTopEndRadius: 5,
        borderEndEndRadius: 5,
    },
    imagePreview: {
        width: width * 0.85,
        height: height * 0.2,
        resizeMode: 'contain',
    },
    errorBorder: {
        borderColor: 'red',
        color: colors.fontDarkColor
    },
});




export default ModalEditProduct;
