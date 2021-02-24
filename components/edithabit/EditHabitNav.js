import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EditHabitMain from './EditHabitMain.js';
import {AddHabitProvider} from '../contexts/AddHabitContext';
import {CategoriesProvider} from '../contexts/CategoriesContext';
import EditHabitItem from './EditHabitItem';

const Stack = createStackNavigator();

const EditHabitNav = () => {
  return (
    <CategoriesProvider>
      <AddHabitProvider>
        <Stack.Navigator initialRouteName="EditHabitMain">
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
        </Stack.Navigator>
      </AddHabitProvider>
    </CategoriesProvider>
  );
};

export default EditHabitNav;
