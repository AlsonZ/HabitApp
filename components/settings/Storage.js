import AsyncStorage from '@react-native-async-storage/async-storage';
import {format, add, sub} from 'date-fns';

const HabitListKey = 'List_Of_All_Habits';
const HabitDayKey = 'Habit_Day_';
const PastHabitKey = 'Past_Habit_Data';
const CategoriesKey = 'Categories';

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

// Scheduled Habits
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
      if (!reducedHabitDetails.completed) {
        reducedHabitDetails.completed = false;
      }
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
      (habit) => habit.id === habitDetails.id,
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
export const deleteAllScheduledHabits = async () => {
  for (let i = 1; i <= 14; i++) {
    try {
      console.log('Deleting all scheduled habit');
      await AsyncStorage.removeItem(HabitDayKey + i);
      console.log('Finished deleting');
    } catch (e) {
      console.log('Delete scheduled habit error: ' + e);
    }
  }
};

// Habits
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
    let matchingId = false;
    for (habit of habitList) {
      if (habit.id === habitDetails.id) {
        matchingId = true;
        break;
      }
    }
    if (matchingId) {
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
    (habit) => habit.id === habitDetails.id,
  );
  // replace old index object with new object
  habitList[index] = habitDetails;
  // store new data
  await storeWithKey(habitList, HabitListKey);
  // edit/replace the day storages
  await editScheduledHabits(habitDetails);
  return 'Success';
};
export const deleteHabit = async (habitDetails) => {
  // get stored data
  const habitsListJSON = await getWithKey(HabitListKey);
  const habitList = await JSON.parse(habitsListJSON);
  // get index
  let index = await habitList.findIndex(
    (habit) => habit.id === habitDetails.id,
  );
  // remove from array
  await habitList.splice(index, 1);
  // store
  await storeWithKey(habitList, HabitListKey);
  // remove from days
  await deleteScheduledHabits(habitDetails);
  return 'Success';
};
export const getAllHabits = async () => {
  const habitListJSON = await getWithKey(HabitListKey);
  return JSON.parse(habitListJSON);
};
export const getDayHabit = async (day) => {
  const key = HabitDayKey + day;
  return await getWithKey(key);
};

// Dates
export const getDate = () => {
  const date = new Date();
  // set to midnight of the current day (past, not future)
  date.setUTCHours(0, 0, 0, 0);
  return date.toISOString();
};
export const getDateDifference = (startDate, endDate) => {
  const treatAsUTC = (date) => {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
  };
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
};

// Past Habit Data
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

// Categories
export const getAllCategories = async () => {
  const categoriesJSON = await getWithKey(CategoriesKey);
  const tempCategories = JSON.parse(categoriesJSON);
  const categories = tempCategories ? tempCategories : [];
  return categories;
};
export const storeNewCategory = async (category) => {
  const categories = await getAllCategories();
  categories.push(category);
  await storeWithKey(categories, CategoriesKey);
  return 'Success';
};
export const deleteCategory = async (category) => {
  const categories = await getAllCategories();
  let index = await categories.findIndex(
    (categoryItem) => categoryItem.id === category.id,
  );
  await categories.splice(index, 1);
  await storeWithKey(categories, CategoriesKey);

  return 'Success';
};

// Calendar Storage
const CALENDAR_HABIT_LIST_KEY = 'Calendar-Habit-List-Key';
const CALENDAR_PAST_HABIT_LIST_KEY_OF_YEAR =
  'Calendar-Past-Habit-List-Key-Of-Year:';

export const getCalendarHabitList = async () => {
  const habitListJSON = await getWithKey(CALENDAR_HABIT_LIST_KEY);
  const temp = JSON.parse(habitListJSON);
  const habitList = temp ? temp : [];

  return habitList;
};
export const storeCalendarHabit = async (habit) => {
  // get habit list
  // no need to clone as it is a new array anyways
  const habitList = await getCalendarHabitList();
  // find index by id
  let index = await habitList.findIndex((habitInList) => {
    return habitInList.id === habit.id;
  });
  // index should be -1
  if (index !== -1) {
    return 'Error, Habit with this id already exists!';
  }
  // push
  habitList.push(habit);
  // store
  await storeWithKey(habitList, CALENDAR_HABIT_LIST_KEY);
  // return success
  return 'Success';
};
export const editCalendarHabit = async (habit) => {
  // get habit list
  const habitList = await getCalendarHabitList();
  // find index
  let index = await habitList.findIndex((habitInList) => {
    return habitInList.id === habit.id;
  });
  if (index === -1) {
    return 'Error, No Habit of this id was found!';
  }
  // replace habit list object of index with new habit
  habitList[index] = habit;
  // store list
  await storeWithKey(habitList, CALENDAR_HABIT_LIST_KEY);
  // return success
  return 'Success';
};

// Calendar Past Storage
const getCalendarPastHabitDataOfYear = async (year) => {
  const habitListJSON = await getWithKey(
    CALENDAR_PAST_HABIT_LIST_KEY_OF_YEAR + year,
  );
  const temp = JSON.parse(habitListJSON);
  const yearListData = temp ? temp : {};
  return yearListData;
};
export const getCalendarPastHabitDataOfDate = async (dateString) => {
  const [day, month, year] = dateString.split('/');

  const yearListData = await getCalendarPastHabitDataOfYear(year);

  const pastHabitData = yearListData.dateString ? yearListData.dateString : [];

  return pastHabitData;
};

export const storeCalendarPastHabitDataOfDate = async (habit, dateString) => {
  const pastHabitData = await getCalendarPastHabitDataOfDate(dateString);

  let index = await pastHabitData.findIndex((habitInData) => {
    return habitInData.id === habit.id;
  });
  // index should be -1
  if (index !== -1) {
    return 'Error, Habit with this id already exists!';
  }

  pastHabitData.push(habit);

  // split date into year
  const [day, month, year] = dateString.split('/');
  // get stored year object
  const yearListData = await getCalendarPastHabitDataOfYear(year);
  // add new date to year
  yearListData.dateString = pastHabitData;
  // store year
  await storeWithKey(yearListData, CALENDAR_PAST_HABIT_LIST_KEY_OF_YEAR + year);
  // success
  return 'Success';
};
export const editCalendarPastHabitDataOfDate = async (habit, dateString) => {
  const pastHabitData = await getCalendarPastHabitDataOfDate(dateString);

  let index = await pastHabitData.findIndex((habitInData) => {
    return habitInData.id === habit.id;
  });
  // index should be -1
  if (index === -1) {
    return 'Error, No Habit of this id was found!';
  }

  pastHabitData[index] = habit;

  // split date into year
  const [day, month, year] = dateString.split('/');
  // get stored year object
  const yearListData = await getCalendarPastHabitDataOfYear(year);
  // replace new date to year
  yearListData.dateString = pastHabitData;
  // store year
  await storeWithKey(yearListData, CALENDAR_PAST_HABIT_LIST_KEY_OF_YEAR + year);
  // success
  return 'Success';
};
