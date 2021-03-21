import React, {useContext} from 'react';
import {StatusBar} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Habits from './Habits';
import {DefaultColors as Colors} from './settings/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsNav from './settings/SettingsNav';
import EditHabitNav from './edithabit/EditHabitNav';
import {HabitListProvider} from './contexts/HabitListContext';
import {EditHabitProvider} from './contexts/EditHabitContext';
import {HabitButtonProvider} from './contexts/HabitButtonContext';
import {ThemeProvider, ThemeContext} from './contexts/ThemeContext';

const Tab = createMaterialBottomTabNavigator();

const TabNavigation = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <HabitButtonProvider>
      <HabitListProvider>
        <EditHabitProvider>
          <StatusBar
            translucent={true}
            backgroundColor={theme.navStatusBarColor}
            barStyle={theme.navStatusBarTextColor}
          />
          <Tab.Navigator
            initialRouteName="Home"
            inactiveColor={Colors.lightgray}
            shifting={true}
            barStyle={{backgroundColor: 'black'}}>
            <Tab.Screen
              name="Home"
              component={Habits}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color}) => (
                  <Icon name="home" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Edit"
              component={EditHabitNav}
              options={{
                tabBarLabel: 'Edit',
                tabBarIcon: ({color}) => (
                  <MCIcon name="lead-pencil" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsNav}
              options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({color}) => (
                  <Icon name="gear" color={color} size={26} />
                ),
              }}
            />
          </Tab.Navigator>
        </EditHabitProvider>
      </HabitListProvider>
    </HabitButtonProvider>
  );
};

export default TabNavigation;
