import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import SettingsMainScreen from './SettingsMainScreen';
import SettingsThemeScreen from './screens/SettingsThemeScreen';
import SettingsHabitButtonScreen from './screens/SettingsHabitButtonScreen';
import HabitColorItem from '../items/HabitColorItem';

const Stack = createStackNavigator();

const SettingsNav = () => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="SettingsMainScreen"
        options={{title: 'Settings', headerTransparent: false}}
        component={SettingsMainScreen}
      />
      <Stack.Screen
        name="SettingsThemeScreen"
        options={{title: 'Theme', headerTransparent: false}}
        component={SettingsThemeScreen}
      />
      <Stack.Screen
        name="SettingsHabitButtonScreen"
        options={{title: 'Habit Button', headerTransparent: false}}
        component={SettingsHabitButtonScreen}
      />
      <Stack.Screen
        name="SettingsHabitButtonDefaultColorScreen"
        options={{
          title: 'Habit Button Default Colors',
          headerTransparent: false,
        }}
        component={HabitColorItem}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default SettingsNav;
