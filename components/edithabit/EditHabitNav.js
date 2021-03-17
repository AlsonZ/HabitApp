import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import EditHabitMain from './EditHabitMain.js';
import {CategoriesProvider} from '../contexts/CategoriesContext';
import EditHabitItem from './EditHabitItem';
import CategoryItem from '../items/CategoryItem';
import ScheduleItem from '../items/ScheduleItem';
import HabitColorItem from '../items/HabitColorItem';
import AddHabitNav from '../addhabit/AddHabitNav';

const Stack = createStackNavigator();

const EditHabitNav = () => {
  return (
    <CategoriesProvider>
      <Stack.Navigator initialRouteName="EditHabitMain" headerMode="screen">
        <Stack.Screen
          name="EditHabitMain"
          options={{title: 'List of Habits'}}
          component={EditHabitMain}
        />
        <Stack.Screen
          options={{
            title: 'Edit Your Habit',
            ...TransitionPresets.SlideFromRightIOS,
          }}
          name="EditHabitItem"
          component={EditHabitItem}
        />
        <Stack.Screen
          options={{
            title: 'Categories',
            ...TransitionPresets.SlideFromRightIOS,
          }}
          name="EditCategories"
          component={CategoryItem}
        />
        <Stack.Screen
          options={{
            title: 'Repeat',
            ...TransitionPresets.SlideFromRightIOS,
          }}
          name="EditHabitSchedule"
          component={ScheduleItem}
        />
        <Stack.Screen
          options={{
            title: 'Select Colors',
            ...TransitionPresets.SlideFromRightIOS,
          }}
          name="EditHabitColors"
          component={HabitColorItem}
        />
        <Stack.Screen
          options={{
            header: () => null,
          }}
          name="AddNewHabit"
          component={AddHabitNav}
        />
      </Stack.Navigator>
    </CategoriesProvider>
  );
};

export default EditHabitNav;
