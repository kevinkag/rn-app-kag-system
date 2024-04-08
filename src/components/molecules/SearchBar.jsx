import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity, FlatList, Text, Modal, TouchableWithoutFeedback } from 'react-native';
import Search from '../../assets/search.svg';
import { colors } from '../../utils/colors';
import {useStore} from '../../stores';
import SvgIcon from '../atoms/SvgIcon';
import { down, filter, up } from '../../assets';
import StyledView from '../templates/StyledView';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [isListVisible, setIsListVisible] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  const { searchProductByName, setField } = useStore();

  const handleSearch = (text) => {
    setSearchText(text);
    searchProductByName(text, activeItem);
  };

  const handleFilter = () => {
    setIsListVisible((prevState) => !prevState);
  };

  const handleItemClick = (item) => {
    setField(item);
    setActiveItem(item);
  };


  const handleContainerPress = () => {
    handleFilter()
  };

  const handleContentPress = (event) => {
    event.stopPropagation();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar..."
        placeholderTextColor="#888"
        onChangeText={(text) => handleSearch(text)}
        keyboardType={activeItem === 'units' ? 'numeric' : 'default'}
        value={searchText}
      />
      <StyledView row>
        <Search width="24" height="24" />
        <TouchableOpacity onPress={handleFilter}>
          <SvgIcon Svg={filter} width="24" height="24" style={{ color: colors.primaryColor, marginLeft: width * 0.02, marginRight: width * 0.01 }} />
        </TouchableOpacity>
      </StyledView>
      <Modal
        visible={isListVisible}
        transparent={true}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={handleContainerPress}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={handleContentPress}>
              <View style={styles.modalContent}>
                <FlatList
                  data={['name', 'units']}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <ItemFilter
                      item={item}
                      active={activeItem === item}
                      onItemClick={() => handleItemClick(item)}
                    />
                  )}
                />
              </View>

            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const ItemFilter = ({ item, active, onItemClick, onArrowClick }) => {
  return (
    <TouchableOpacity style={[styles.containerFilterList, active && styles.activeItem]} onPress={() => onItemClick(item)}>
      <StyledView row ai="center" jc="space-between">
        <Text style={styles.textFilterList}>{renderFieldInSpanish(item)}</Text>
      </StyledView>
    </TouchableOpacity>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    height: height * 0.06,
    borderColor: colors.primaryColor,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: height * 0.01,
    elevation: 2,
  },
  input: {
    color: 'black',
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Fondo oscuro transparente
  },
  modalContent: {
    position: 'absolute',
    top: height * 0.137,
    right: width * 0.03,
    backgroundColor: 'white',
    width: width * 0.4,
    borderRadius: 4,
    elevation:4,
  },
  containerFilterList: {
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderColor: colors.blueGrayColor,
    padding: 10,
  },
  activeItem: {
    backgroundColor: 'lightblue', // Cambia el color según el estado activo
  },
  textFilterList: {
    color: 'gray',
    paddingBottom: 6,
    fontWeight: '400',
  },
});

const renderFieldInSpanish = (field) => {
  switch (field) {
    case 'name':
      return 'Nombre';
    case 'units':
      return 'Cantidad';
    default:
      return '';
  }
};

export default SearchBar;
