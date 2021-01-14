import React from 'react';
import {View, Text} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Habits from './Habits';
import Colors from './settings/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const AddHabit = () => {
  return (
    <View>
      <Text>Add Habit</Text>
    </View>
  );
};
const EditHabit = () => {
  return (
    <View>
      <Text>Edit Habit</Text>
    </View>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Home" inactiveColor={Colors.lightgray}>
      <Tab.Screen
        name="Home"
        component={Habits}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddHabit}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: ({color}) => (
            <MCIcon name="plus-circle-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Edit"
        component={EditHabit}
        options={{
          tabBarLabel: 'Edit',
          tabBarIcon: ({color}) => (
            <MCIcon name="lead-pencil" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
