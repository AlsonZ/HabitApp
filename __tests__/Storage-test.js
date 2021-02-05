import 'react-native';
import {
  storeNewHabit,
  getAllHabits,
  getDayHabit,
  editHabit,
} from '../components/settings/Storage';
import {Colors} from '../components/settings/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('Storage Tests', () => {
  const HabitListKey = 'List_Of_All_Habits';
  const HabitDayKey = 'Habit_Day_';
  test('Store New Habit', async () => {
    const mockHabitDetails = {
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
        expect(AsyncStorage.setItem).nthCalledWith(
          nthCall++,
          HabitDayKey + mockHabitDetails.schedule[i].day,
          JSON.stringify([reducedMockHabitDetails]),
        );
      }
    }
  });
  test('Get With Key', async () => {
    const storedHabitsJSON = await getAllHabits();
    const storedHabits = JSON.parse(storedHabitsJSON);
    storedHabits.forEach((habit) => {
      console.log('Got: ' + habit.name);
    });
  });
  test('Get First Day with Key', async () => {
    const storedHabitsJSON = await getDayHabit(1);
    const storedHabits = JSON.parse(storedHabitsJSON);
    console.log(storedHabits);
    // storedHabits.forEach((habit) => {
    // console.log('Got First Day: ' + habit.name);
    // });
  });
  test('Edit Habit', async () => {
    // edit the previous habit
    const editedHabit = {
      name: 'Testing Edited Habit',
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
    await editHabit(editedHabit);
    // view habit and check if it has been edited in habitlist
    const storedHabitsJSON = await getAllHabits();
    const storedHabits = JSON.parse(storedHabitsJSON);
    // storedHabits.forEach((habit) => {
    //   console.log('Got: ' + habit.name);
    // });
    expect(storedHabits).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Testing Habit',
          description: 'This is a mock testing habit',
        }),
      ]),
    );
    // view habit days and check if they have been removed or added
  });
});
