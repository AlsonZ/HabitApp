import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {DefaultColors} from '../settings/Colors';
import {config} from '../config/config';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import ScrollPicker from './ScrollPicker';
import {format, isLeapYear} from 'date-fns';
import {ThemeContext} from '../contexts/ThemeContext';

const ScheduleItem = ({navigation, route}) => {
  const parentRoute = route.params.parentRoute;
  // set this to scheduletype from navigation and not default to the config
  const [active, setActive] = useState(route.params.scheduleType);
  const durationAmount = [...Array(365)].map((_, index) => index + 1);
  const durationType = ['days', 'weeks', 'months', 'years'];
  const [
    selectedDurationAmountIndex,
    setSelectedDurationAmountIndex,
  ] = useState(0);
  const [
    userSelectedDurationAmountIndex,
    setUserSelectedDurationAmountIndex,
  ] = useState(0);
  const [
    userSelectedDurationTypeIndex,
    setUserSelectedDurationTypeIndex,
  ] = useState(0);
  const [selectedDurationTypeIndex, setSelectedDurationTypeIndex] = useState(0);
  const [days, setDays] = useState([...Array(31)].map((_, index) => index + 1));
  const months = [...Array(12)].map((_, index) => index + 1);
  const currentYear = new Date().getFullYear();
  const years = [...Array(10)].map((_, index) => currentYear + index);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [userSelectedDayIndex, setUserSelectedDayIndex] = useState(0);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const [userSelectedMonthIndex, setUserSelectedMonthIndex] = useState(0);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [userSelectedYearIndex, setUserSelectedYearIndex] = useState(0);

  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const [selectedWeekdays, setSelectedWeekdays] = useState(
    config.scheduleType.weekday.days,
  );

  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    console.log(
      'Selected Values:',
      durationAmount[selectedDurationAmountIndex],
      durationType[selectedDurationTypeIndex],
    );
  }, [selectedDurationAmountIndex, selectedDurationTypeIndex]);

  const ScheduleButton = ({scheduleType}) => {
    return (
      <TouchableHighlight
        underlayColor={DefaultColors.touchableHightlightUnderlay}
        onPress={() => {
          setActive(scheduleType);
          switch (scheduleType.name) {
            case 'weekly':
              setSelectedDurationAmountIndex(scheduleType.duration.weeks - 1);
              setUserSelectedDurationAmountIndex(
                scheduleType.duration.weeks - 1,
              );
              setSelectedDurationTypeIndex(1);
              setUserSelectedDurationTypeIndex(1);
              break;
            case 'fortnightly':
              setSelectedDurationAmountIndex(scheduleType.duration.weeks - 1);
              setUserSelectedDurationAmountIndex(
                scheduleType.duration.weeks - 1,
              );
              setSelectedDurationTypeIndex(1);
              setUserSelectedDurationTypeIndex(1);
              break;
            case 'monthly':
              setSelectedDurationAmountIndex(scheduleType.duration.months - 1);
              setUserSelectedDurationAmountIndex(
                scheduleType.duration.months - 1,
              );
              setSelectedDurationTypeIndex(2);
              setUserSelectedDurationTypeIndex(2);
              break;
            case 'yearly':
              setSelectedDurationAmountIndex(scheduleType.duration.years - 1);
              setUserSelectedDurationAmountIndex(
                scheduleType.duration.years - 1,
              );
              setSelectedDurationTypeIndex(3);
              setUserSelectedDurationTypeIndex(3);
              break;
            case 'custom':
              setSelectedDurationAmountIndex(scheduleType.duration.days - 1);
              setUserSelectedDurationTypeIndex(scheduleType.duration.days - 1);
              setSelectedDurationTypeIndex(0);
              setUserSelectedDurationAmountIndex(0);
              break;
          }
        }}>
        <View style={styles.container}>
          <CheckBox
            tintColors={{true: theme.highlightColor, false: theme.borderColor}}
            value={scheduleType.name === active.name}
            onChange={() => {
              setActive(scheduleType);
            }}
          />
          <Text style={[styles.checkBoxText, {color: theme.textColor}]}>
            {scheduleType.name}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  const WeekdayButton = ({name, index}) => {
    return (
      <TouchableHighlight
        underlayColor={DefaultColors.touchableHightlightUnderlay}
        onPress={() => {
          setSelectedWeekdays((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
          }));
        }}>
        <View style={styles.container}>
          <CheckBox
            tintColors={{true: theme.highlightColor, false: theme.borderColor}}
            value={selectedWeekdays[index]}
            onChange={() => {
              setSelectedWeekdays((prevState) => ({
                ...prevState,
                [index]: !prevState[index],
              }));
            }}
          />
          <Text style={[styles.checkBoxText, {color: theme.textColor}]}>
            {name}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  useEffect(() => {
    // set selected
    // startDate
    const [dayString, monthString, yearString] = route.params.startDate.split(
      '/',
    );
    // duration
    // set active checkbox
    // {name: 'everyday', duration: {days: 1}}
    switch (route.params.scheduleType.name) {
      case 'weekly':
        setSelectedDurationAmountIndex(
          route.params.scheduleType.duration.weeks - 1,
        );
        setUserSelectedDurationAmountIndex(
          route.params.scheduleType.duration.weeks - 1,
        );
        setSelectedDurationTypeIndex(1);
        setUserSelectedDurationTypeIndex(1);
        break;
      case 'fortnightly':
        setSelectedDurationAmountIndex(
          route.params.scheduleType.duration.weeks - 1,
        );
        setUserSelectedDurationAmountIndex(
          route.params.scheduleType.duration.weeks - 1,
        );
        setSelectedDurationTypeIndex(1);
        setUserSelectedDurationTypeIndex(1);
        break;
      case 'monthly':
        setSelectedDurationAmountIndex(
          route.params.scheduleType.duration.months - 1,
        );
        setUserSelectedDurationAmountIndex(
          route.params.scheduleType.duration.months - 1,
        );
        setSelectedDurationTypeIndex(2);
        setUserSelectedDurationTypeIndex(2);
        break;
      case 'yearly':
        setSelectedDurationAmountIndex(
          route.params.scheduleType.duration.years - 1,
        );
        setUserSelectedDurationAmountIndex(
          route.params.scheduleType.duration.years - 1,
        );
        setSelectedDurationTypeIndex(3);
        setUserSelectedDurationTypeIndex(3);
        break;
      case 'custom':
        console.log(route.params.scheduleType);
        // need to check what key is in duration here
        // Object.keys(route.params.scheduleType.duration)
        let key = [];
        for (const type in route.params.scheduleType.duration) {
          key.push(type);
        }
        const typeIndex = durationType.findIndex((type) => key[0] === type);
        console.log(
          'duration amount',
          key,
          route.params.scheduleType.duration,
          route.params.scheduleType.duration[key],
          route.params.scheduleType.duration[key] - 1,
        );
        setUserSelectedDurationTypeIndex(typeIndex);
        setSelectedDurationTypeIndex(typeIndex);
        // then set index, amount also relies on this key
        setSelectedDurationAmountIndex(
          route.params.scheduleType.duration[key] - 1,
        );
        setUserSelectedDurationAmountIndex(
          route.params.scheduleType.duration[key] - 1,
        );
        break;
    }

    // set startDate to params
    setSelectedDayIndex(parseInt(dayString) - 1);
    setUserSelectedDayIndex(parseInt(dayString) - 1);
    setSelectedMonthIndex(parseInt(monthString) - 1);
    setUserSelectedMonthIndex(parseInt(monthString) - 1);
    // find index of year
    const yearIndex = years.findIndex((year) => parseInt(yearString) === year);
    setSelectedYearIndex(yearIndex);
    setUserSelectedYearIndex(yearIndex);
  }, []);

  useEffect(() => {
    switch (selectedMonthIndex) {
      case 0 || 2 || 4 || 6 || 7 || 9 || 11:
        setDays([...Array(31)].map((_, index) => index + 1));
        break;
      case 3 || 5 || 8 || 10:
        setDays([...Array(30)].map((_, index) => index + 1));
        break;
      case 1:
        if (isLeapYear(new Date(years[selectedYearIndex], 1, 1))) {
          setDays([...Array(29)].map((_, index) => index + 1));
        } else {
          setDays([...Array(28)].map((_, index) => index + 1));
        }
        break;
    }
  }, [selectedMonthIndex, selectedYearIndex]);

  return (
    <ScrollView
      nestedScrollEnabled
      contentContainerStyle={[
        styles.scrollContainer,
        {backgroundColor: theme.backgroundColor},
        // {backgroundColor: '#F2F2F2'},
      ]}>
      <ScrollView horizontal contentContainerStyle={{width: '100%'}}>
        <FlatList
          data={Object.keys(config.scheduleType)}
          renderItem={({item}) => (
            <ScheduleButton
              key={config.scheduleType[item].name}
              scheduleType={config.scheduleType[item]}
            />
          )}
          keyExtractor={(key) => key}
        />
      </ScrollView>
      {active.name !== config.scheduleType.everyday?.name &&
        active.name !== config.scheduleType.weekday?.name && (
          <Text style={[styles.sectionTitle, {color: theme.textColor}]}>
            Duration
          </Text>
        )}
      <ScrollView
        horizontal
        contentContainerStyle={styles.horizontalScrollContainer}>
        {active.name !== config.scheduleType.everyday?.name &&
          active.name !== config.scheduleType.weekday?.name && (
            <>
              <ScrollPicker
                values={durationAmount}
                selectedValueIndex={selectedDurationAmountIndex}
                setSelectedValueIndex={setSelectedDurationAmountIndex}
                width={80}
                itemHeight={60}
                fontSize={18}
                userSelectedIndex={userSelectedDurationAmountIndex}
              />
              <ScrollPicker
                values={durationType}
                selectedValueIndex={selectedDurationTypeIndex}
                setSelectedValueIndex={setSelectedDurationTypeIndex}
                width={100}
                itemHeight={60}
                fontSize={18}
                userSelectedIndex={userSelectedDurationTypeIndex}
              />
            </>
          )}
      </ScrollView>
      {active.name !== config.scheduleType.everyday?.name &&
        active.name !== config.scheduleType.weekday?.name && (
          <Text style={[styles.sectionTitle, {color: theme.textColor}]}>
            Start Date
          </Text>
        )}
      <ScrollView
        horizontal
        contentContainerStyle={styles.horizontalScrollContainer}>
        {active.name !== config.scheduleType.everyday?.name &&
          active.name !== config.scheduleType.weekday?.name && (
            <>
              <ScrollPicker
                values={days}
                selectedValueIndex={selectedDayIndex}
                setSelectedValueIndex={setSelectedDayIndex}
                width={80}
                itemHeight={60}
                userSelectedIndex={userSelectedDayIndex}
                title="Day"
                titleStyle={{backgroundColor: theme.backgroundColor}}
              />
              <ScrollPicker
                values={months}
                selectedValueIndex={selectedMonthIndex}
                setSelectedValueIndex={setSelectedMonthIndex}
                width={80}
                itemHeight={60}
                userSelectedIndex={userSelectedMonthIndex}
                title="Month"
                titleStyle={{backgroundColor: theme.backgroundColor}}
              />
              <ScrollPicker
                values={years}
                selectedValueIndex={selectedYearIndex}
                setSelectedValueIndex={setSelectedYearIndex}
                width={100}
                itemHeight={60}
                userSelectedIndex={userSelectedYearIndex}
                title="Year"
                titleStyle={{backgroundColor: theme.backgroundColor}}
              />
            </>
          )}
      </ScrollView>
      {active.name === config.scheduleType.weekday?.name && (
        <Text style={[styles.sectionTitle, {color: theme.textColor}]}>
          Weekdays
        </Text>
      )}
      <ScrollView
        horizontal
        contentContainerStyle={styles.horizontalScrollContainer}>
        {active.name === config.scheduleType.weekday?.name && (
          <FlatList
            data={weekdays}
            renderItem={({item, index}) => (
              <WeekdayButton key={item} name={item} index={index} />
            )}
            keyExtractor={(key) => key}
          />
        )}
      </ScrollView>
      <View style={styles.saveButtonContainer}>
        <Button
          title="Save"
          onPress={() => {
            if (
              active.name === config.scheduleType.weekly?.name ||
              active.name === config.scheduleType.fortnightly?.name ||
              active.name === config.scheduleType.monthly?.name ||
              active.name === config.scheduleType.yearly?.name ||
              active.name === config.scheduleType.custom?.name
            ) {
              // {name: 'everyday', duration: {days: 1}}
              const selectedDate = `${days[selectedDayIndex]}/${months[selectedMonthIndex]}/${years[selectedYearIndex]}`;
              const type = durationType[selectedDurationTypeIndex];
              const amount = durationAmount[selectedDurationAmountIndex];
              navigation.navigate(parentRoute, {
                startDate: selectedDate,
                scheduleType: {
                  name: active.name,
                  duration: {
                    [type]: amount,
                  },
                },
              });
            } else if (active.name === config.scheduleType.weekday?.name) {
              const selectedDate = `${days[selectedDayIndex]}/${months[selectedMonthIndex]}/${years[selectedYearIndex]}`;
              navigation.navigate(parentRoute, {
                startDate: selectedDate,
                scheduleType: {
                  name: active.name,
                  days: selectedWeekdays,
                },
              });
            } else if (active.name === config.scheduleType.everyday?.name) {
              const selectedDate = `${days[selectedDayIndex]}/${months[selectedMonthIndex]}/${years[selectedYearIndex]}`;
              navigation.navigate(parentRoute, {
                startDate: selectedDate,
                scheduleType: {
                  name: active.name,
                },
              });
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 17,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    margin: 2,
    marginBottom: 0,
  },
  checkBoxText: {
    fontSize: 15,
    width: '100%',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 5,
  },
  horizontalScrollContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  saveButtonContainer: {
    paddingTop: 5,
    paddingBottom: 17,
    marginHorizontal: 17,
    width: '100%',
  },
});

export default ScheduleItem;
