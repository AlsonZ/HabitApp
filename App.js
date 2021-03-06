import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Image} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './components/TabNavigation';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const App = () => {
  useEffect(() => {
    try {
      changeNavigationBarColor('#123123');
    } catch (e) {
      console.log('Change Nav Error: ' + e);
    }
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        {/* <SafeAreaView style={{flex: 1}}> */}
        <TabNavigation />
        {/* </SafeAreaView> */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
