import React, { useState } from 'react';
import { Modal, View, Text, Switch, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

const InputImage = ({ visible, onClose, setLinkImagen }) => {
  const [useLink, setUseLink] = useState(false);
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');


  const handleInputChange = (text) => {
    if (useLink) {
      setImageUrl(text);
      setLinkImagen(text)
    }
  };

  const handleSwitchChange = () => {
    setUseLink(!useLink);
  };

  const handleSelectImage = () => {
    // Lógica para seleccionar una imagen del dispositivo
    // Esta parte puede ser implementada por ti
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.header}>Seleccionar Imagen</Text>

          <View style={styles.switchContainer}>
            <Text>Usar enlace:</Text>
            <Switch
              value={useLink}
              onValueChange={handleSwitchChange}
            />
          </View>

          {useLink ? (
            <TextInput
              style={styles.input}
              placeholder="Introduce la URL de la imagen"
              value={imageUrl}
              onChangeText={handleInputChange}
            />
          ) : (
            <TouchableOpacity onPress={handleSelectImage}>
              <Text>Seleccionar imagen del dispositivo</Text>
            </TouchableOpacity>
          )}

          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : null}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const { width, height } = Dimensions.get('window');
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
    width: width * 0.8,
    borderRadius: 10,
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});

export default InputImage;
