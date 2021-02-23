import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AddHabitMain from './AddHabitMain.js';
import {AddHabitProvider} from '../contexts/AddHabitContext';
import {CategoriesProvider} from '../contexts/CategoriesContext';

import CategoryItem from '../items/CategoryItem';
import ScheduleItem from '../items/ScheduleItem';
import HabitColorItem from '../items/HabitColorItem';

const Stack = createStackNavigator();

const testPage = () => {
  return (
    <View>
      <Text>Testing</Text>
    </View>
  );
};

const AddHabitNav = () => {
  return (
    <CategoriesProvider>
      <AddHabitProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            options={{title: 'Create a new Habit'}}
            component={AddHabitMain}
          />
          <Stack.Screen name="test" component={testPage} />
          <Stack.Screen name="Category" component={CategoryItem} />
          <Stack.Screen
            name="Schedule"
            options={{title: 'Repeat every'}}
            component={ScheduleItem}
          />
          <Stack.Screen
            name="HabitColorItem"
            options={{title: 'Select Colors'}}
            component={HabitColorItem}
          />
        </Stack.Navigator>
      </AddHabitProvider>
    </CategoriesProvider>
  );
};

const styles = StyleSheet.create({});

export default AddHabitNav;
