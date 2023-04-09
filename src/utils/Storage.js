import AsyncStorage from '@react-native-async-storage/async-storage';

// Para almacenar un valor en AsyncStorage
async function saveData(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
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
      console.log('Data retrieved successfully:', value);
      return value;
    } else {
      console.log('No data found for key:', key);
    }
  } catch (error) {
    console.log('Error retrieving data:', error);
  }
}

export { saveData, getData };