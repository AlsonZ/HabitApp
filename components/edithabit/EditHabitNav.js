import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EditHabitMain from './EditHabitMain.js';
import {AddHabitProvider} from '../contexts/AddHabitContext';
import {CategoriesProvider} from '../contexts/CategoriesContext';

import CategoryItem from '../items/CategoryItem';

const Stack = createStackNavigator();

const EditHabitNav = () => {
  return (
    <CategoriesProvider>
      <AddHabitProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            options={{title: 'Edit Your Habits'}}
            component={EditHabitMain}
          />
          <Stack.Screen name="Category" component={CategoryItem} />
        </Stack.Navigator>
      </AddHabitProvider>
    </CategoriesProvider>
  );
};

export default EditHabitNav;
