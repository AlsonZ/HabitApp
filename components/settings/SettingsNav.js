import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import SettingsMainScreen from './SettingsMainScreen';
import SettingsThemeScreen from './SettingsThemeScreen';

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
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default SettingsNav;
