import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './components/TabNavigation';
import {ThemeProvider, ThemeContext} from './components/contexts/ThemeContext';

const HabitApp = () => {
  const [theme] = useContext(ThemeContext);
  const MyTheme = {
    dark: true,
    colors: {
      primary: theme.highlightColor,
      background: theme.backgroundColor,
      card: 'rgb(0,0,0)',
      text: 'rgb(255,255,255)',
      border: 'rgb(0,0,0)',
      notification: 'rgb(0,0,0)',
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <TabNavigation />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <HabitApp />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
