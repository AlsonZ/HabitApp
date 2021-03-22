import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsMainScreen from './SettingsMainScreen';
import SettingsThemeScreen from './screens/SettingsThemeScreen';
import SettingsHabitButtonScreen from './screens/SettingsHabitButtonScreen';
import HabitColorItem from '../items/HabitColorItem';
import {ThemeContext} from '../contexts/ThemeContext';

const Stack = createStackNavigator();

const SettingsNav = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerStyle: {backgroundColor: theme.navTopBarColor},
        headerTintColor: theme.navTopBarTextColor,
      }}>
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
