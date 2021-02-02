import AsyncStorage from '@react-native-async-storage/async-storage';

const HabitListKey = 'List_Of_All_Habits';

const storeWithKey = async (value, key) => {
  try {
    key = key ? key : 'Key-Not-Found';
    const jsonValue = JSON.stringify(value);
    console.log(`Storing JSON with key ${key}: ` + jsonValue);
    await AsyncStorage.setItem('key', jsonValue);
  } catch (e) {
    console.log('Storage STORE_WITH_KEY Error: ' + e);
  }
};

const getWithKey = async (key) => {
  try {
    key = key ? key : 'Key-Not-Found';
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue != null) {
      return jsonValue;
    } else {
      return null;
    }
  } catch (e) {
    console.log('Storage GET_WITH_KEY Error: ' + e);
  }
};

const storeScheduledHabits = async (habitDetails) => {
  // check day/schedule of habit
  // get the arrays from the day/s
  // normal setItem or multiSetitem depending on days
};

export const storeNewHabit = async (habitDetails) => {
  // get habits list to modify
  const habitsListJSON = await getWithKey(HabitListKey);
  const habitList = await JSON.parse(habitsListJSON);
  // make sure name is not repeated
  let matchingName = false;
  for (habit in habitList) {
    if (habit.name == habitDetails.name) {
      matchingName = true;
      break;
    }
  }
  if (matchingName) {
    return 'Name Matches Existing Habit';
  }
  // add habit to general list of habits array
  habitList.push(habitDetails);
  // store the new list of habits
  storeWithKey(habitList, HabitListKey);
  // this then calls a function to store new habit into mutliple smaller scheduled day storages
  storeScheduledHabits(habitDetails);
};
export const getHabit = async (key) => {
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
