import React, {useContext} from 'react';
import {View} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Home from '../icons/Home';
import EditIcon from '../icons/Edit';
import GearIcon from '../icons/Gear';

const Tab = createMaterialBottomTabNavigator();

const PlaceholderComponent = () => {
  return <View></View>;
};

const BottomNavigation = () => {
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
            return <Home />;
          } else if (route.name === 'Habits') {
            return <EditIcon />;
          } else if (route.name === 'Settings') {
            return <GearIcon />;
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

export default BottomNavigation;
