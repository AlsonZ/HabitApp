import React, {useContext, useEffect, useState} from 'react';
import {AddHabitContext} from '../contexts/AddHabitContext';
import {HabitListContext} from '../contexts/HabitListContext';
import {EditHabitContext} from '../contexts/EditHabitContext';
import {ThemeContext} from '../contexts/ThemeContext';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ScrollView,
} from 'react-native';
import ScheduleItem from '../items/ScheduleItem';

import {DefaultColors as Colors, DefaultColors} from '../settings/Colors';
import OkModal from '../modal/OkModal';
import ColorIcon from '../icons/ColorIcon';
import NumberIcon from '../icons/NumberIcon';

import AntIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {storeCalendarHabit} from '../storage/Storage';
import {config} from '../config/config';

const AddHabitMain = ({navigation, route}) => {
  const [habitDetails, setHabitDetails, reloadAddHabitContext] = useContext(
    AddHabitContext,
  );
  const [, , reloadEditHabitContext] = useContext(EditHabitContext);
  const [, , , , reloadHabitListContext] = useContext(HabitListContext);
  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    if (route.params?.category) {
      setHabitDetails((prevState) => {
        return {
          ...prevState,
          category: route.params.category,
        };
      });
    }
    if (route.params?.colors) {
      setHabitDetails((prevState) => {
        return {
          ...prevState,
          colors: route.params.colors,
        };
      });
    }
    if (route.params?.startDate) {
      setHabitDetails((prevState) => {
        return {
          ...prevState,
          startDate: route.params.startDate,
        };
      });
    }
    if (route.params?.scheduleType) {
      console.log(route.params?.scheduleType);
      setHabitDetails((prevState) => {
        return {
          ...prevState,
          scheduleType: route.params.scheduleType,
        };
      });
    }
  }, [
    route.params?.category,
    route.params?.colors,
    route.params?.startDate,
    route.params?.scheduleType,
  ]);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContainer,
        {backgroundColor: theme.backgroundColor},
      ]}>
      <View style={styles.habitItem}>
        <MCIcon
          style={styles.habitIcon}
          name="lead-pencil"
          color={theme.iconColor}
          size={26}
        />
        <TextInput
          style={{flex: 1, color: theme.textColor}}
          placeholderTextColor={theme.textColor}
          placeholder="Habit Name"
          value={habitDetails.name}
          onChangeText={(text) =>
            setHabitDetails({...habitDetails, name: text})
          }></TextInput>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AddHabitCategory', {
            parentRoute: route.name,
          })
        }
        style={styles.habitItem}>
        <AntIcon
          style={styles.habitIcon}
          name="appstore-o"
          color={theme.iconColor}
          size={26}
        />
        <Text style={[styles.habitText, {color: theme.textColor}]}>
          {habitDetails.category}
        </Text>
        <MCIcon
          style={styles.rightIcon}
          name="code-greater-than"
          color={theme.iconColor}
          size={26}
        />
      </TouchableOpacity>
      <View style={styles.habitItem}>
        <AntIcon
          style={styles.habitIcon}
          name="filetext1"
          color={theme.iconColor}
          size={24}></AntIcon>
        <TextInput
          style={{flex: 1, color: theme.textColor}}
          placeholderTextColor={theme.textColor}
          placeholder="Description"
          value={habitDetails.description}
          onChangeText={(text) =>
            setHabitDetails({...habitDetails, description: text})
          }></TextInput>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddHabitSchedule', {
            startDate: habitDetails.startDate, // '01/01/2021'
            scheduleType: habitDetails.scheduleType, // {name: 'everyday', duration: {days: 1}}
            parentRoute: route.name,
          });
        }}
        style={styles.habitItem}>
        <FontistoIcon
          style={styles.habitIcon}
          name="date"
          color={theme.iconColor}
          size={24}
        />
        <Text style={[styles.habitText, {color: theme.textColor}]}>
          Schedule Type:
        </Text>
        <View style={styles.rightIcon}>
          <Text style={[styles.habitText, {color: theme.textColor}]}>
            {habitDetails.scheduleType?.name.charAt(0).toUpperCase() +
              habitDetails.scheduleType?.name.slice(1)}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddHabitSchedule', {
            startDate: habitDetails.startDate, // '01/01/2021'
            scheduleType: habitDetails.scheduleType, // {name: 'everyday', duration: {days: 1}}
            parentRoute: route.name,
          });
        }}
        style={styles.habitItem}>
        <FontistoIcon
          style={styles.habitIcon}
          name="date"
          color={theme.iconColor}
          size={24}
        />
        <Text style={[styles.habitText, {color: theme.textColor}]}>
          Start Date:
        </Text>
        <View style={styles.rightIcon}>
          <Text style={[styles.habitText, {color: theme.textColor}]}>
            {habitDetails.startDate}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity disabled onPress={() => {}} style={styles.habitItem}>
        <FontistoIcon
          style={styles.habitIcon}
          name="date"
          color={'gray'}
          size={24}
        />
        <Text style={[styles.habitText, {color: 'gray'}]}>
          Next Occurance Date:
        </Text>
        <View style={styles.rightIcon}>
          <Text style={[styles.habitText, {color: 'gray'}]}>
            {habitDetails.nextOccuranceDate}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('test')}
        style={styles.habitItem}
        disabled={true}>
        <FontistoIcon
          style={styles.habitIcon}
          name="clock"
          color={'gray'}
          size={24}
        />
        <Text style={[styles.habitText, {color: 'gray'}]}>Frequency</Text>
        <NumberIcon
          number={habitDetails.frequency}
          borderColor="gray"
          textColor="gray"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AddHabitColors', {
            colors: habitDetails.colors,
            parentRoute: route.name,
          })
        }
        style={styles.habitItem}>
        <IonIcon
          style={styles.habitIcon}
          name="color-palette-outline"
          color={theme.iconColor}
          size={24}
        />
        <Text style={[styles.habitText, {color: theme.textColor}]}>Colors</Text>
        <ColorIcon
          activeColor={habitDetails.colors?.backgroundActiveColor}
          borderColor={theme.borderColor}
          style={styles.colorIcon}
        />
      </TouchableOpacity>

      {/* Reminders is not a feature currently enabled */}
      <TouchableOpacity
        onPress={() => navigation.navigate('test')}
        style={styles.habitItem}
        disabled={true}>
        <IonIcon
          style={styles.habitIcon}
          name="notifications-outline"
          color={'gray'}
          size={24}
        />
        <Text style={[styles.habitText, {color: 'gray'}]}>Reminders</Text>
        <NumberIcon number={`0`} borderColor="gray" textColor="gray" />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button
          title="Create New Habit"
          onPress={async () => {
            const success = await storeCalendarHabit(habitDetails);
            if (success === 'Success') {
              // show modal popup for success with 3 buttons
              // one to go to home, other to continue making duplicate habit
              // one to start new
              // reload Context's when new habit is added
              reloadAddHabitContext();
              reloadHabitListContext();
              reloadEditHabitContext();
              // send to main screen
              navigation.navigate('EditHabitMain');
            } else if (success === 'Name Matches Existing Habit') {
              //show modal popup for error
              console.log(success);
            }
          }}></Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    display: 'flex',
    flexGrow: 1,
    padding: 17,
  },
  habitItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    marginBottom: 6,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  habitIcon: {
    width: 35,
    height: 25,
  },
  habitText: {
    margin: 3,
  },
  rightIcon: {
    marginLeft: 'auto',
  },
  colorIcon: {
    position: 'absolute',
    marginRight: 3,
    marginLeft: 'auto',
    right: 0,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: 17,
  },
});

export default AddHabitMain;
