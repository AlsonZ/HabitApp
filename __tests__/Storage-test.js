import 'react-native';
import {
  storeNewHabit,
  getAllHabits,
  getDayHabit,
} from '../components/settings/Storage';
import {Colors} from '../components/settings/Colors';

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
});
