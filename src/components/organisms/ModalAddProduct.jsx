import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, Dimensions, TouchableWithoutFeedback, Button, Image, TouchableOpacity } from 'react-native';
import ButtonApp from '../atoms/ButtonApp';
import SvgIcon from '../atoms/SvgIcon';
import { codebar, down, up } from '../../assets';
import { colors } from '../../utils/colors';
import IconInput from '../atoms/IconInput';
import InputImage from '../atoms/InputImage';
import StyledView from '../templates/StyledView';
import {useStore} from '../../stores';
import Scan from '../atoms/Scan';

const ModalAddProduct = ({ visible, onClose, onSubmit, }) => {

  const { createProductAsync, products } = useStore()



  const [form, setForm] = useState({
    name: '',
    costPrice: '',
    sellingPrice: '',
    units: '',
    barcode: {},
  });

  const [scanVisible, setScanVisible] = useState(false)

  const [imagePreview, setImagePreview] = useState(null);
  const [linkImagen, setLinkImagen] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [modalBarCodeVisible, setModalBarCodeVisible] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    costPrice: false,
    sellingPrice: false,
    units: false,
  });


  const [isEmptyValues, setIsEmptyValues] = useState(true)




  useEffect(() => {
    if (linkImagen) {
      fetchImageFromUrl(linkImagen);
    } else {
      setImagePreview(null);
    }
  }, [linkImagen]);

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

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
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
        image: linkImagen
      };
      createProductAsync(formData);
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


  const handleSubmitImage = (formData) => {
    // Handle image submission
  };

  const handleContainerPress = () => {
    onClose();
    setErrors('')
  };

  const handleContentPress = (event) => {
    event.stopPropagation();
  };

  const handleChange = (key, value) => {
    if (value) {
      setIsEmptyValues(false)
    }
    setForm({
      ...form,
      [key]: value,
    });
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [key]: false,
      }));
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
              <Text style={styles.header}>Agregar Producto</Text>
              <StyledView w={85}>
                <TextInput
                  style={[styles.input, errors.name && styles.errorBorder]}
                  placeholder="Nombre del Producto"
                  placeholderTextColor={'gray'}

                  value={form.name}
                  onChangeText={(text) => handleChange('name', text)} />
              </StyledView>
              <StyledView w={85} mt={1} row jc='space-between'>
                <IconInput
                  style={[styles.input, errors.costPrice && styles.errorBorder, { width: width * 0.4 }]}
                  placeholder="Costo"
                  keyboardType="numeric"
                  placeholderTextColor={'gray'}
                  value={form.costPrice}
                  icon={down}
                  onChangeText={(text) => handleChange('costPrice', text)}
                  colorIcon={colors.pastelRedColor}
                />
                <IconInput
                  style={[styles.input, errors.sellingPrice && styles.errorBorder, { width: width * 0.4 }]}
                  placeholder="Venta"
                  keyboardType="numeric"
                  placeholderTextColor={'gray'}

                  icon={up}
                  value={form.sellingPrice}
                  onChangeText={(text) => handleChange('sellingPrice', text)}
                  colorIcon={colors.pastelGreenColor}
                />
              </StyledView>
              <StyledView w={85} mt={1}>
                <TextInput
                  style={[styles.input, errors.units && styles.errorBorder]}
                  placeholder="Cantidad"
                  keyboardType="numeric"
                  placeholderTextColor={'gray'}

                  value={form.units}
                  onChangeText={(text) => handleChange('units', text)} />
              </StyledView>
              <StyledView w={85} mt={1}>
                <ButtonApp text="Subir imagen" outline onPress={handleOpenModal} style={{ elevation: 1, borderRadius: 4, height: height * 0.06 }} />
                <InputImage
                  visible={modalVisible}
                  onClose={handleCloseModal}
                  onSubmit={handleSubmitImage}
                  setLinkImagen={setLinkImagen} />
                {imagePreview && (
                  <Image source={{ uri: imagePreview }} style={styles.imagePreview} />
                )}
              </StyledView>
              <StyledView row w={85} mt={2}>
                <TextInput
                  style={[styles.input, { borderRightWidth: 0, borderTopEndRadius: 0, borderEndEndRadius: 0, width: width * 0.71, color: 'gray' }]}
                  placeholder="Código de Barras"
                  placeholderTextColor={'gray'}
                  keyboardType="numeric"
                  editable={false}
                  value={form.barcode?.code}
                  onChangeText={(text) => handleChange('barcode', text)} />
                <StyledView w={14} h={6} jc='center' ai='center' style={styles.iconContainer}>
                  {/* <TouchableOpacity onPress={() => setModalBarCodeVisible(true)}> */}
                  <TouchableOpacity onPress={() => setScanVisible(true)}>

                    <SvgIcon Svg={codebar} width={35} height={35} />
                  </TouchableOpacity>
                </StyledView>
              </StyledView>
              <StyledView w={85} mt={1} row jc='space-around'>
                <ButtonApp text="Cancelar" style={{ width: width * 0.25 }} onPress={handleContainerPress} />
                <ButtonApp text="Guardar" style={{ width: width * 0.25 }} onPress={handleSubmit} />
              </StyledView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
      {/* <BarcodeScanner
        visible={modalBarCodeVisible}
        setVisible={setModalBarCodeVisible}
        onClose={onClose}
        isEmptyValues={isEmptyValues}
        setResult={(text) => handleChange('barcode', text)} /> */}
      <Scan visible={scanVisible} 
      setResult={(text) => handleChange('barcode', text)} 
      setVisible={setScanVisible} 
      products={products} 
      onClose={onClose} />

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
    color: colors.primaryColor
  },
  input: {
    height: height * 0.06,
    color: colors.fontDarkColor,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorBorder: {
    borderColor: 'red',
    color: colors.fontDarkColor
  },
  imagePreview: {
    width: width * 0.85,
    height: height * 0.2,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  iconContainer: {
    backgroundColor: colors.primaryColor,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: '#b2b2b2',
    borderTopEndRadius: 5,
    borderEndEndRadius: 5,
  }
});

export default ModalAddProduct;
