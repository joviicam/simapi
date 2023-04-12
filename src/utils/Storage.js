import AsyncStorage from '@react-native-async-storage/async-storage';

// Para almacenar un valor en AsyncStorage
async function saveData(key, value) {
  try {
    const stringValue = value.toString();
    await AsyncStorage.setItem(key, stringValue);
    console.log('Data saved successfully');
  } catch (error) {
    console.log('Error saving data:', error);
  }
}

// Para recuperar un valor de AsyncStorage
async function getData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Data retrieved successfully!: ' + value);
      // imprime el tipo de dato de value
      return value;
    } else {
      console.log('No data found');
      return null;
    }
  } catch (error) {
    console.log('Error retrieving data: ', error);
    return null;
  }
}

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data removed successfully!');
  } catch (error) {
    console.log('Error removing data: ', error);
  }
};

export { saveData, getData, removeData };