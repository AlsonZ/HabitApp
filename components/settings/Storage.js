import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeHabits = async (value, key) => {
  try {
    key = key ? key : 'Key-Not-Found';
    const jsonValue = JSON.stringify(value);
    console.log(`Storing JSON with key ${key}: ` + jsonValue);
    await AsyncStorage.setItem('key', jsonValue);
  } catch (e) {
    console.log('Storage STORE Error: ' + e);
  }
};
export const getHabits = async (key) => {
  try {
    key = key ? key : 'Key-Not-Found';
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue != null) {
      return jsonValue;
    } else {
      return null;
    }
  } catch (e) {
    console.log('Storage GET Error: ' + e);
  }
};

export const setDate = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    console.log('Storing Date JSON: ' + jsonValue);
    await AsyncStorage.setItem('HabitDate', jsonValue);
  } catch (e) {
    console.log('Storage STORE Error: ' + e);
  }
};

export const getDate = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('HabitDate');
    if (jsonValue != null) {
      return jsonValue;
    } else {
      return null;
    }
  } catch (e) {
    console.log('Storage GET Error: ' + e);
  }
};
