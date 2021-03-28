import React, {useContext} from 'react';
import {View} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const PlaceholderComponent = () => {
  return <View></View>;
};

const TabNavigation = () => {
  return (
    // <LoadedHabitsProvider>
    // <ListOfHabitsProvider>
    <Tab.Navigator
      shifting
      backBehavior="none"
      initialRouteName="Home"
      activeColor="white"
      inactiveColor="lightgrey"
      barStyle={{backgroundColor: 'black'}}
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          if (route.name === 'Home') {
            // return icon house
          } else if (route.name === 'Habits') {
            // return icon pencil
          } else if (route.name === 'Settings') {
            // return icon gear
          }
        },
      })}>
      <Tab.Screen name="Home" component={PlaceholderComponent} />
      <Tab.Screen name="Habits" component={PlaceholderComponent} />
      <Tab.Screen name="Settings" component={PlaceholderComponent} />
    </Tab.Navigator>
    // </ListOfHabitsProvider>
    // </LoadedHabitsProvider>
  );
};

export default RootNavigation;
