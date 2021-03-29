import React, {useContext} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';

const RootNavigation = () => {
  // const [theme] = useContext(ThemeContext);
  // const MyTheme = {
  //   dark: true,
  //   colors: {
  //     primary: theme.highlightColor,
  //     background: theme.backgroundColor,
  //     card: 'rgb(0,0,0)',
  //     text: 'rgb(255,255,255)',
  //     border: 'rgb(0,0,0)',
  //     notification: 'rgb(0,0,0)',
  //   },
  // };
  return (
    <NavigationContainer>
      <StatusBar
      // translucent={true}
      // backgroundColor={theme.navStatusBarColor}
      // barStyle={theme.navStatusBarTextColor}
      />
      <BottomNavigation />
    </NavigationContainer>
  );
};

export default RootNavigation;
