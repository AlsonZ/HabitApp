import AsyncStorage from '@react-native-async-storage/async-storage';

const HabitListKey = 'List_Of_All_Habits';
const HabitDayKey = 'Habit_Day_';

const storeWithKey = async (value, key) => {
  try {
    key = key ? key : 'Key-Not-Found';
    const jsonValue = JSON.stringify(value);
    // console.log(`Storing JSON with key ${key}: ` + jsonValue);
    await AsyncStorage.setItem(key, jsonValue);
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
  // check array of schedule for active days
  for (let i = 0; i < habitDetails.schedule.length; i++) {
    if (habitDetails.schedule[i].active) {
      const key = HabitDayKey + habitDetails.schedule[i].day;
      // get previously stored data
      const habitDayJSON = await getWithKey(key);
      let tempHabitData = await JSON.parse(habitDayJSON);
      if (!tempHabitData) {
        tempHabitData = [];
      }
      const habitDay = await tempHabitData;
      // make habit data smaller for individual days
      const {category, schedule, ...reducedHabitDetails} = habitDetails;
      // add new data
      habitDay.push(reducedHabitDetails);
      // store into storage
      await storeWithKey(habitDay, key);
    }
  }
  // normal setItem or multiSetitem depending on days
};

export const storeNewHabit = async (habitDetails) => {
  // get habits list to modify
  const habitsListJSON = await getWithKey(HabitListKey);
  let tempHabitList = await JSON.parse(habitsListJSON);
  if (!tempHabitList) {
    tempHabitList = [];
  }
  const habitList = await tempHabitList;
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
  await storeWithKey(habitList, HabitListKey);
  // this then calls a function to store new habit into mutliple smaller scheduled day storages
  await storeScheduledHabits(habitDetails);
};
export const editHabit = async (habitDetails) => {
  // get stored data
  const habitsListJSON = await getWithKey(HabitListKey);
  const habitList = await JSON.parse(habitsListJSON);
  // get index of old habit data
  let index = await habitList.findIndex(
    (habit) => habit.name === habitDetails.name,
  );
  // replace old index object with new object
  habitList[index] = habitDetails;
  // store new data
  await storeWithKey(habitList, HabitListKey);
  // edit/replace the day storages
};
export const getAllHabits = async () => {
  return await getWithKey(HabitListKey);
};
export const getDayHabit = async (day) => {
  const key = HabitDayKey + day;
  return await getWithKey(key);
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
