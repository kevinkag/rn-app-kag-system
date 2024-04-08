import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to save a value to AsyncStorage
const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
  // Function to get a value from AsyncStorage
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      } else {
        console.log('No data found for the specified key');
        return null;
      }
    } catch (error) {
      console.error('Error getting data:', error);
      return null;
    }
  };
  
  // Function to remove a value from AsyncStorage
  const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log('Data removed successfully');
    } catch (error) {
      console.error('Error removing data:', error);
    }
  };
  
  // Function to update a value in AsyncStorage
  const updateData = async (key, newValue) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
      console.log('Data updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  
  const Storage = {
      updateData,
      removeData,
      saveData,
      getData
  }

  export const StorageKeys = {
    PRODUCT: 'productStorage'
    // Agrega más claves aquí según sea necesario
  };
    
  export default Storage
  
  
    