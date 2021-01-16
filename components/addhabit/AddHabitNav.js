import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AddHabitMain from './AddHabitMain.js';

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
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        options={{title: 'Create a new Habit'}}
        component={AddHabitMain}
      />
      <Stack.Screen name="test" component={testPage} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default AddHabitNav;
