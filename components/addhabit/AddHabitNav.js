import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AddHabitMain from './AddHabitMain.js';
import {AddHabitProvider} from '../contexts/AddHabitContext';
import {CategoriesProvider} from '../contexts/CategoriesContext';

import CategoryItem from '../items/CategoryItem';
import ScheduleItem from '../items/ScheduleItem';
import HabitColorItem from '../items/HabitColorItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const AddHabitNav = () => {
  const insets = useSafeAreaInsets();
  return (
    <CategoriesProvider>
      <AddHabitProvider>
        <Stack.Navigator
          headerMode="screen"
          screenOptions={{headerStatusBarHeight: insets.top}}>
          <Stack.Screen
            name="Main"
            options={{title: 'Create a new Habit', headerTransparent: false}}
            component={AddHabitMain}
          />
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
