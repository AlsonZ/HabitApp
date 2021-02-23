import AsyncStorage from '@react-native-async-storage/async-storage';

const HabitListKey = 'List_Of_All_Habits';
const HabitDayKey = 'Habit_Day_';
const PastHabitKey = 'Past_Habit_Data';

const storeWithKey = async (value, key) => {
  try {
    key = key ? key : 'Key-Not-Found';
    const jsonValue = JSON.stringify(value);
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
const deleteScheduledHabits = async (habitDetails) => {
  for (let i = 0; i < habitDetails.schedule.length; i++) {
    // get array data
    const key = HabitDayKey + habitDetails.schedule[i].day;
    const habitDayJSON = await getWithKey(key);
    const tempHabitDayData = await JSON.parse(habitDayJSON);
    const habitDayData = (await tempHabitDayData) ? tempHabitDayData : [];
    // find matching name
    let index = await habitDayData.findIndex(
      (habit) => habit.name === habitDetails.name,
    );
    // delete object from array
    if (index !== -1) {
      habitDayData.splice(index, 1);
      await storeWithKey(habitDayData, key);
    }
  }
};
const editScheduledHabits = async (habitDetails) => {
  // delete old
  await deleteScheduledHabits(habitDetails);
  // store new
  await storeScheduledHabits(habitDetails);
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
  if (tempHabitList) {
    let matchingName = false;
    for (habit of habitList) {
      if (habit.name == habitDetails.name) {
        matchingName = true;
        break;
      }
    }
    if (matchingName) {
      return 'Name Matches Existing Habit';
    }
  }

  // add habit to general list of habits array
  habitList.push(habitDetails);
  // store the new list of habits
  await storeWithKey(habitList, HabitListKey);
  // this then calls a function to store new habit into mutliple smaller scheduled day storages
  await storeScheduledHabits(habitDetails);
  return 'Success';
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
  await editScheduledHabits(habitDetails);
};
export const deleteHabit = async (habitDetails) => {
  // get stored data
  const habitsListJSON = await getWithKey(HabitListKey);
  const habitList = await JSON.parse(habitsListJSON);
  // get index
  let index = await habitList.findIndex(
    (habit) => habit.name === habitDetails.name,
  );
  // remove from array
  await habitList.splice(index, 1);
  // store
  await storeWithKey(habitList, HabitListKey);
  // remove from days
  await deleteScheduledHabits(habitDetails);
};
export const getAllHabits = async () => {
  const habitListJSON = await getWithKey(HabitListKey);
  return JSON.parse(habitListJSON);
};
export const getDayHabit = async (day) => {
  const key = HabitDayKey + day;
  return await getWithKey(key);
};

export const getDate = () => {
  const date = new Date();
  // set to midnight of the current day (past, not future)
  date.setUTCHours(0, 0, 0, 0);
  return date.toISOString();
};

const treatAsUTC = (date) => {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
};

export const getDateDifference = (startDate, endDate) => {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
};

export const storeNewPastHabitData = async (habitData) => {
  const pastHabitDataJSON = await getWithKey(PastHabitKey);
  const tempPastHabitData = JSON.parse(pastHabitDataJSON);
  const pastHabitData = tempPastHabitData ? tempPastHabitData : [];
  pastHabitData.push(habitData);
  await storeWithKey(pastHabitData, PastHabitKey);
};

export const editPastHabitData = async (habitData) => {
  // get data
  const pastHabitDataJSON = await getWithKey(PastHabitKey);
  const pastHabitData = JSON.parse(pastHabitDataJSON);
  // get index of old data
  // can possibly use the last index, but index is more secure
  let index = await pastHabitData.findIndex((pastHabit) => {
    const pastHabitDate = new Date(pastHabit.startDate);
    const habitDataDate = new Date(habitData.startDate);
    return pastHabitDate.getTime() === habitDataDate.getTime();
  });
  // replace old index object with new object
  pastHabitData[index] = habitData;
  // store new data
  await storeWithKey(pastHabitData, PastHabitKey);
};

export const getPastHabitData = async () => {
  const pastHabitDataJSON = await getWithKey(PastHabitKey);
  const tempPastHabitData = JSON.parse(pastHabitDataJSON);
  const pastHabitData = tempPastHabitData ? tempPastHabitData : [];
  return pastHabitData;
};

export const getLatestPastHabitData = async () => {
  const pastHabitDataJSON = await getWithKey(PastHabitKey);
  const tempPastHabitData = JSON.parse(pastHabitDataJSON);
  const pastHabitData = tempPastHabitData ? tempPastHabitData : [];
  const latestHabitData = pastHabitData[pastHabitData.length - 1];
  return latestHabitData;
};

export const deleteAllPastHabitData = async () => {
  try {
    console.log('Deleting all habit data');
    await AsyncStorage.removeItem(PastHabitKey);
    console.log('Finished deleting');
  } catch (e) {
    console.log('Delete past habit data error: ' + e);
  }
};
