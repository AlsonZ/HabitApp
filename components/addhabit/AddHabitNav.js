import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import AddHabitMain from './AddHabitMain.js';
import {AddHabitProvider} from '../contexts/AddHabitContext';
import {CategoriesProvider} from '../contexts/CategoriesContext';

import CategoryItem from '../items/CategoryItem';
import ScheduleItem from '../items/ScheduleItem';
import HabitColorItem from '../items/HabitColorItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeContext} from '../contexts/ThemeContext';

const Stack = createStackNavigator();

const AddHabitNav = () => {
  const insets = useSafeAreaInsets();
  const [theme, setTheme] = useContext(ThemeContext);
  return (
    <CategoriesProvider>
      <AddHabitProvider>
        <Stack.Navigator
          headerMode="screen"
          screenOptions={{
            headerStatusBarHeight: insets.top,
            headerStyle: {backgroundColor: theme.navTopBarColor},
            headerTintColor: theme.navTopBarTextColor,
          }}>
          <Stack.Screen
            name="AddHabitMain"
            options={{title: 'Create a new Habit', headerTransparent: false}}
            component={AddHabitMain}
          />
          <Stack.Screen
            name="AddHabitCategory"
            component={CategoryItem}
            options={{
              title: 'Categories',
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="AddHabitSchedule"
            options={{title: 'Repeat '}}
            component={ScheduleItem}
          />
          <Stack.Screen
            name="AddHabitColors"
            options={{
              title: 'Select Colors',
              ...TransitionPresets.SlideFromRightIOS,
            }}
            component={HabitColorItem}
          />
        </Stack.Navigator>
      </AddHabitProvider>
    </CategoriesProvider>
  );
};

const styles = StyleSheet.create({});

export default AddHabitNav;
