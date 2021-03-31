import AsyncStorage from '@react-native-async-storage/async-storage';

// const HabitListKey = 'List_Of_All_Habits';
// const HabitDayKey = 'Habit_Day_';
// const PastHabitKey = 'Past_Habit_Data';

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

// Theme
const THEME_KEY = 'Theme_key';
export const getTheme = async () => {
  const themeJSON = await getWithKey(THEME_KEY);
  const temp = JSON.parse(themeJSON);
  const theme = temp ? temp : {};
  return theme;
};

export const storeOrEditTheme = async (newTheme) => {
  let theme = await getTheme();
  theme = newTheme;
  await storeWithKey(theme, THEME_KEY);
  return 'Success';
};

// Categories
const CategoriesKey = 'Categories';
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

// Habit Button Defaults
const DEFAULT_HABIT_BUTTON = 'Default-Habit-Button-Key';
export const getDefaultHabitButton = async () => {
  const defaultHabitJSON = await getWithKey(DEFAULT_HABIT_BUTTON);
  const temp = JSON.parse(defaultHabitJSON);
  const defaultHabit = temp ? temp : {};
  return defaultHabit;
};
export const storeOrEditDefaultHabitButton = async (defaultHabitButton) => {
  let habitButtonData = await getAllCategories();
  habitButtonData = defaultHabitButton;
  await storeWithKey(habitButtonData, DEFAULT_HABIT_BUTTON);
  return 'Success';
};

// Calendar Storage
const CALENDAR_HABIT_LIST_KEY = 'Calendar-Habit-List-Key';

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
  } else {
    // push
    habitList.push(habit);
    // store
    await storeWithKey(habitList, CALENDAR_HABIT_LIST_KEY);
    // return success
    return 'Success';
  }
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
  } else {
    // replace habit list object of index with new habit
    habitList[index] = habit;
    // store list
    await storeWithKey(habitList, CALENDAR_HABIT_LIST_KEY);
    // return success
    return 'Success';
  }
};
export const deleteCalendarHabit = async (habit) => {
  const habitList = await getCalendarHabitList();
  let index = await habitList.findIndex((habitInList) => {
    return habitInList.id === habit.id;
  });
  if (index === -1) {
    return 'Error, No Habit of this id was found!';
  } else {
    await habitList.splice(index, 1);
    await storeWithKey(habitList, CALENDAR_HABIT_LIST_KEY);
    return 'Success';
  }
  // may need to delete the past habit data habit for current day
};
export const deleteAllCalendarHabits = async () => {
  console.log('Deleting All Calendar Habits');
  await AsyncStorage.removeItem(CALENDAR_HABIT_LIST_KEY);
};

// Calendar Past Storage
const CALENDAR_PAST_HABIT_LIST_KEY_OF_YEAR =
  'Calendar-Past-Habit-List-Key-Of-Year:';

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

  const pastHabitData = yearListData[dateString]
    ? yearListData[dateString]
    : [];

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
  yearListData[dateString] = pastHabitData;
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
  yearListData[dateString] = pastHabitData;
  // store year
  await storeWithKey(yearListData, CALENDAR_PAST_HABIT_LIST_KEY_OF_YEAR + year);
  // success
  return 'Success';
};
export const deleteCalendarPastHabitDataOfYear = async (year) => {
  console.log('Deleting All Calendar Past Habit Data of Year:', year);
  await AsyncStorage.removeItem(CALENDAR_PAST_HABIT_LIST_KEY_OF_YEAR + year);
};
