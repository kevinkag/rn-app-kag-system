import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SvgIcon from '../atoms/SvgIcon';
import { search, squareadd } from '../../assets';
import { colors } from '../../utils/colors';
import ModalAddSellManuality from '../organisms/modals/ModalAddSellManuality';

const AddToSell = ({ products, setForm, form }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false)
  const [modalDataForm, setModalDataForm] = useState(null)

  useEffect(() => {

  }, [form, products])



  const handleStateForm = (item) => {
    setForm((prevForm) => {
      if (prevForm) {
        return [...prevForm, item]
      } else {
        return [item]
      }
    })
  }

  const openModalWithInfo = (item) => {
    setVisibleModal(true)
    setSearchText('')
    setModalDataForm(item)
    setSearchResults([]); // Limpiar los resultados de la búsqueda
  }

  // Función para manejar el cambio en el texto de búsqueda
  const handleSearchChange = (text, products) => {
    let filteredProducts
    setSearchText(text);
    if (text === '') {
      setSearchResults([]);
      return
    }

    filteredProducts = products
      .filter(product => product.name.toLowerCase()
        .includes(text.toLowerCase()))

    setSearchResults(filteredProducts);
  };

  const onCloseModal = () => {
    setVisibleModal(false)
  }

  return (
    <><View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Agregar manualmente"
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={(text) => handleSearchChange(text, products)} />
      <SvgIcon Svg={search} width={24} height={24} styles={{ color: colors.fontDarkColor }} />
      {/* Lista de resultados de búsqueda */}

    </View><View style={!searchResults && styles.searchResultsContainer}>
        {searchResults.map((result) => (
          <TouchableOpacity style={styles.containerTextResults} onPress={() => {
            openModalWithInfo(result);
            setSearchResults([]); // Limpiar los resultados de la búsqueda al presionar el elemento
          }}
          >
            <Text key={result.id} style={styles.textSearchResults}>{result.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ModalAddSellManuality
        visible={visibleModal}
        itemInfo={modalDataForm}
        handleStateForm={handleStateForm}
        closeModal={onCloseModal}
      />
    </>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    height: height * 0.06,
    borderColor: colors.primaryColor,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: height * 0.01,
    paddingRight: width * 0.03
  },
  input: {
    flex: 1,
    height: 40,
    color: 'black',
  },
  icon: {
    marginLeft: 10,
  },
  searchResultsContainer: {
    marginBottom: height * 0.01,

  },
  containerTextResults: {
  },

  textSearchResults: {
    marginBottom: 2,
    paddingVertical: 4,
    paddingHorizontal: 6,
    width: '99%',
    color: 'gray',
    backgroundColor: 'white',
  }
});

export default AddToSell;
