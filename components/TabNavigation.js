import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Habits from './Habits';

const Tab = createMaterialBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="habits" component={Habits} />
      {/* <Tab.Screen name="settings" component={Settings} /> */}
    </Tab.Navigator>
  );
};

export default TabNavigation;
