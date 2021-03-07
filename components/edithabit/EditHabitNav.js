import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EditHabitMain from './EditHabitMain.js';
import {CategoriesProvider} from '../contexts/CategoriesContext';
import EditHabitItem from './EditHabitItem';
import CategoryItem from '../items/CategoryItem';
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
          options={{title: 'Edit Your Habit'}}
          name="EditHabitItem"
          component={EditHabitItem}
        />
        <Stack.Screen
          options={{title: 'Categories'}}
          name="EditCategories"
          component={CategoryItem}
        />
        <Stack.Screen
          options={{title: 'Select Colors'}}
          name="EditHabitColors"
          component={HabitColorItem}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="AddNewHabit"
          component={AddHabitNav}
        />
      </Stack.Navigator>
    </CategoriesProvider>
  );
};

export default EditHabitNav;
