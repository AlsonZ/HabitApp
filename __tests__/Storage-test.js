import 'react-native';
import {
  storeNewHabit,
  getAllHabits,
  getDayHabit,
  editHabit,
  deleteHabit,
  getDate,
  storeNewPastHabitData,
  getLatestPastHabitData,
  editPastHabitData,
  getDateDifference,
  getPastHabitData,
  deleteAllPastHabitData,
  storeCalendarHabit,
  getCalendarHabitList,
} from '../components/settings/Storage';
import {Colors} from '../components/settings/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';

describe('Storage Tests', () => {
  const HabitListKey = 'List_Of_All_Habits';
  const HabitDayKey = 'Habit_Day_';
  const PastHabitKey = 'Past_Habit_Data';
  const date = getDate();
  // const {schedule, category, ...reducedHabitData} = mockHabitDetails;
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 14);
  const mockHabitDetails = {
    id: 1,
    name: 'Testing Habit',
    category: 'Testing',
    description: 'This is a mock testing habit',
    schedule: [
      {day: 1, active: true},
      {day: 2, active: false},
      {day: 3, active: true},
      {day: 4, active: true},
      {day: 5, active: true},
      {day: 6, active: true},
      {day: 7, active: true},
      {day: 8, active: true},
      {day: 9, active: true},
      {day: 10, active: true},
      {day: 11, active: true},
      {day: 12, active: true},
      {day: 13, active: false},
      {day: 14, active: true},
    ],
    dailySchedule: 1,
    colors: {
      textColor: Colors.gray,
      backgroundColor: Colors.transparent,
      textActiveColor: Colors.white,
      backgroundActiveColor: Colors.blue,
    },
    order: 1,
  };
  const editedHabit = {
    id: 1,
    name: 'Testing Habit', // name cannot be changed
    category: 'Testing',
    description: 'This is a mock edited testing habit',
    schedule: [
      {day: 1, active: true},
      {day: 2, active: true},
      {day: 3, active: true},
      {day: 4, active: true},
      {day: 5, active: true},
      {day: 6, active: true},
      {day: 7, active: true},
      {day: 8, active: false},
      {day: 9, active: false},
      {day: 10, active: true},
      {day: 11, active: true},
      {day: 12, active: true},
      {day: 13, active: false},
      {day: 14, active: true},
    ],
    dailySchedule: 1,
    colors: {
      textColor: Colors.red,
      backgroundColor: Colors.transparent,
      textActiveColor: Colors.white,
      backgroundActiveColor: Colors.blue,
    },
    order: 1,
  };
  const habitData = {
    startDate: date,
    endDate: endDate.toISOString(),
    latestDate: date,
    habitDays: [
      [
        {name: 'day1 habit1', completed: false},
        {name: 'day1 habit2', completed: true},
      ],
      [
        {name: 'day2 habit1', completed: true},
        {name: 'day2 habit2', completed: false},
      ],
    ],
  };
  const editedhabitData = {
    startDate: date,
    endDate: endDate.toISOString(),
    latestDate: date,
    habitDays: [
      [
        {name: 'day1 habit1', completed: true},
        {name: 'day1 habit2', completed: true},
      ],
      [
        {name: 'day2 habit1', completed: false},
        {name: 'day2 habit2', completed: false},
      ],
    ],
  };
  test('Store New Habit', async () => {
    await storeNewHabit(mockHabitDetails);

    expect(AsyncStorage.setItem).nthCalledWith(
      1,
      HabitListKey,
      JSON.stringify([mockHabitDetails]),
    );
    let nthCall = 2;
    for (let i = 0; i < mockHabitDetails.schedule.length; i++) {
      if (mockHabitDetails.schedule[i].active) {
        const {
          category,
          schedule,
          ...reducedMockHabitDetails
        } = mockHabitDetails;
        if (!reducedMockHabitDetails.completed) {
          reducedMockHabitDetails.completed = false;
        }
        expect(AsyncStorage.setItem).nthCalledWith(
          nthCall++,
          HabitDayKey + mockHabitDetails.schedule[i].day,
          JSON.stringify([reducedMockHabitDetails]),
        );
      }
    }
  });
  test('Get All Habits', async () => {
    // const storedHabitsJSON =
    await getAllHabits();
    // const storedHabits = JSON.parse(storedHabitsJSON);

    expect(AsyncStorage.getItem).lastCalledWith(HabitListKey);
  });
  test('Get Days with Key', async () => {
    for (let i = 0; i < mockHabitDetails.schedule.length; i++) {
      // const storedHabitsJSON =
      await getDayHabit(mockHabitDetails.schedule[i].day);
      // const storedHabits = JSON.parse(storedHabitsJSON);
      expect(AsyncStorage.getItem).lastCalledWith(
        HabitDayKey + mockHabitDetails.schedule[i].day,
      );
    }
  });
  test('Edit Habit', async () => {
    // edit the previous habit

    await editHabit(editedHabit);
    // view habit and check if it has been edited in habitlist
    const storedHabits = await getAllHabits();
    // const storedHabits = JSON.parse(storedHabitsJSON);
    // expect edited data here
    expect(storedHabits).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: 'This is a mock edited testing habit',
          schedule: expect.arrayContaining([
            expect.objectContaining({day: 2, active: true}),
            expect.objectContaining({day: 8, active: false}),
            expect.objectContaining({day: 9, active: false}),
            expect.objectContaining({day: 13, active: false}),
          ]),
        }),
      ]),
    );
    // view habit days and check if they have been removed or added
  });
  test('Check edited individual days', async () => {
    // habit already edited due to previous test
    const schedule = editedHabit.schedule;
    for (let i = 0; i < schedule.length; i++) {
      const storedHabitsJSON = await getDayHabit(schedule[i].day);
      const storedHabits = await JSON.parse(storedHabitsJSON);
      if (schedule[i].active) {
        expect(storedHabits).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: 'Testing Habit',
              description: 'This is a mock edited testing habit',
            }),
          ]),
        );
      } else {
        expect(storedHabits).not.toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: 'Testing Habit',
              description: 'This is a mock edited testing habit',
            }),
          ]),
        );
      }
    }
  });
  test('Store duplicate habit', async () => {
    const success = await storeNewHabit(mockHabitDetails);

    expect(success).toEqual('Name Matches Existing Habit');
  });
  test('Store another New Habit', async () => {
    const {...mockHabitDetails2} = mockHabitDetails;
    mockHabitDetails2.name = 'Testing Second Habit';
    mockHabitDetails2.id = 2;
    await storeNewHabit(mockHabitDetails2);

    const habitDetails = await getAllHabits();
    // const habitDetails = JSON.parse(habitDetailsJSON);

    expect(habitDetails).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: mockHabitDetails2.name,
        }),
      ]),
    );
  });
  test('Delete Habit', async () => {
    await deleteHabit(mockHabitDetails); // same name
    const storedHabits = await getAllHabits();
    // const storedHabits = JSON.parse(storedHabitsJSON);
    expect(storedHabits).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Testing Habit',
        }),
      ]),
    );
  });
  test('Check deleted individual days', async () => {
    const schedule = editedHabit.schedule;
    for (let i = 0; i < schedule.length; i++) {
      const storedHabitsJSON = await getDayHabit(schedule[i].day);
      const storedHabits = await JSON.parse(storedHabitsJSON);
      if (schedule[i].active) {
        expect(storedHabits).not.toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: 'Testing Habit',
            }),
          ]),
        );
      }
    }
  });
  test('Add new Past Habit Data', async () => {
    await storeNewPastHabitData(habitData);
    expect(AsyncStorage.setItem).lastCalledWith(
      PastHabitKey,
      JSON.stringify([habitData]),
    );
  });
  test('Edit Past Habit Data', async () => {
    await editPastHabitData(editedhabitData);

    const latestPastHabitData = await getLatestPastHabitData();

    expect(latestPastHabitData).toEqual(
      expect.objectContaining({
        startDate: date,
        habitDays: expect.arrayContaining([
          expect.arrayContaining([
            expect.objectContaining({
              name: 'day1 habit1',
              completed: true,
            }),
          ]),
          expect.arrayContaining([
            expect.objectContaining({
              name: 'day2 habit1',
              completed: false,
            }),
          ]),
        ]),
      }),
    );
  });
});

describe('Date Tests', () => {
  const date = getDate();
  const addDateDifference = (dateDifference) => {
    const differentDate = new Date(date);
    differentDate.setDate(differentDate.getDate() + dateDifference);
    return differentDate;
  };

  test('Get Date is correct', () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    expect(date).toEqual(today.toISOString());
  });
  test('Get Date Difference', () => {
    const dateDifference = 7;
    const date1WeekLater = addDateDifference(dateDifference);
    const difference = getDateDifference(date, date1WeekLater);
    expect(difference).toEqual(dateDifference);
  });
  test('Get Date Difference with more than 1 month', () => {
    const dateDifference = 30;
    const date1MonthLater = addDateDifference(dateDifference);
    const difference = getDateDifference(date, date1MonthLater);
    expect(difference).toEqual(dateDifference);
  });
  test('Get Date Difference with different hours', () => {
    const [year, month, dayTime] = date.split('-');
    const [day, time] = dayTime.split('T');
    const dateWithDifferentHour = new Date(
      Date.UTC(year, month - 1, day, 3, 24, 0),
    );
    const difference = getDateDifference(date, dateWithDifferentHour);
    expect(difference).toBeLessThan(1);
  });
  test('Get Date Difference with future date as startDate', () => {
    const dateDifference = -7;
    const date1WeekPrev = addDateDifference(dateDifference);
    const difference = getDateDifference(date, date1WeekPrev);
    expect(difference).toEqual(dateDifference);
  });
});

describe('Calendar Habit Tests', () => {
  const CALENDAR_HABIT_LIST_KEY = 'Calendar-Habit-List-Key';
  const formatDate = (dateObj) => {
    return format(dateObj, 'dd/MM/yyyy');
  };
  const config = {
    scheduleType: {
      everyday: {name: 'everyday', duration: {days: 1}},
      weekly: {name: 'weekly', duration: {weeks: 1}},
      fortnightly: {name: 'fortnightly', duration: {weeks: 2}},
      monthly: {name: 'monthly', duration: {months: 1}},
      yearly: {name: 'yearly', duration: {years: 1}},
      singleTime: {name: 'singleTime'},
      weekday: {name: 'weekday'},
      custom: {
        name: 'custom',
        duration: {days: 1, weeks: 0, months: 0, years: 0},
      }, // this will be added/changed by user
    },
  };
  const testCalendarHabits = [
    {
      id: 1,
      name: 'daily',
      description: 'test1',
      colors: {
        textColor: 'gray',
        backgroundColor: 'transparent',
        textActiveColor: 'black',
        backgroundActiveColor: 'lightblue',
      },
      archived: false,
      frequency: 1,
      scheduleType: config.scheduleType.everyday,
      startDate: formatDate(new Date()), // will be chosen by user
      endDate: null,
      lastOccuranceDate: null,
      // will be startdate by default then changes later,
      // stays current day if loaded until next day,
      // where today will be > nextoccurdate in which then it will be updated
      nextOccuranceDate: formatDate(new Date()), // should be editable for user as it might screw up
    },
  ];
  test('Add new Calendar Habit', async () => {
    // store habit
    await storeCalendarHabit(testCalendarHabits[0]);
    // get list of habits
    const habitList = await getCalendarHabitList();
    // expect habit to be in list
    expect(habitList[0]).toEqual(testCalendarHabits[0]);
  });
  test('Get Calendar Habit List', async () => {
    // get list of habits
    const habitList = await getCalendarHabitList();
    // expect habit to be in list
    expect(AsyncStorage.getItem).lastCalledWith(CALENDAR_HABIT_LIST_KEY);
  });
});
