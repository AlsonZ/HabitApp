import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AddHabitMain from './AddHabitMain.js';
import {AddHabitProvider} from '../contexts/AddHabitContext';

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
    <AddHabitProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          options={{title: 'Create a new Habit'}}
          component={AddHabitMain}
        />
        <Stack.Screen name="test" component={testPage} />
      </Stack.Navigator>
    </AddHabitProvider>
  );
};

const styles = StyleSheet.create({});

export default AddHabitNav;
