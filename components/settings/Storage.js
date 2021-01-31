import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeHabits = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    console.log('Storing JSON: ' + jsonValue);
    await AsyncStorage.setItem('HabitList', jsonValue);
  } catch (e) {
    console.log('Storage STORE Error: ' + e);
  }
};
export const getHabits = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('HabitList');
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

export const getDate = async (value) => {
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
