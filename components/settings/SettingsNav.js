import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import SettingsMainScreen from './SettingsMainScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const SettingsNav = () => {
  // const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      headerMode="screen"
      // screenOptions={{headerStatusBarHeight: insets.top}}
    >
      <Stack.Screen
        name="SettingsMainScreen"
        options={{title: 'Settings', headerTransparent: false}}
        component={SettingsMainScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default SettingsNav;
