import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from './components/contexts/ThemeContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootNavigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
