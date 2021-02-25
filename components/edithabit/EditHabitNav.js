import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EditHabitMain from './EditHabitMain.js';
import {EditHabitProvider} from '../contexts/EditHabitContext';
import {CategoriesProvider} from '../contexts/CategoriesContext';
import EditHabitItem from './EditHabitItem';

const Stack = createStackNavigator();

const EditHabitNav = () => {
  return (
    <CategoriesProvider>
      <EditHabitProvider>
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
      </EditHabitProvider>
    </CategoriesProvider>
  );
};

export default EditHabitNav;
