import React, {useContext, useEffect, useState, useRef} from 'react';
import {FlatList, StyleSheet, useWindowDimensions} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import {SafeAreaView} from 'react-native-safe-area-context';
import {format, parse, add, sub, isAfter} from 'date-fns';

import {DefaultColors as Colors} from './settings/Colors';
import Clock from './Clock';
import HabitButton from './HabitButton';
import {HabitListContext} from './contexts/HabitListContext';
import {HabitButtonContext} from './contexts/HabitButtonContext';
import {ThemeContext} from './contexts/ThemeContext';

const Habits = () => {
  const [
    habitList,
    updateHabit,
    loadDay,
    currentlyLoadedDay,
    reloadHabitListContext,
  ] = useContext(HabitListContext);
  const [habitButtonSettings] = useContext(HabitButtonContext);
  const [theme] = useContext(ThemeContext);
  const [habitButtonView, setHabitButtonView] = useState(
    habitButtonSettings.habitButtonView,
  );
  const [habitColumns, setHabitColumns] = useState(1);
  const calendarRef = useRef(null);
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const parseDate = (dateString) => {
    return parse(dateString, 'dd/MM/yyyy', new Date());
  };
  const formatDate = (dateObj) => {
    return format(dateObj, 'dd/MM/yyyy');
  };
  const getToday = () => {
    return parseDate(formatDate(new Date()));
  };

  useEffect(() => {
    // 84 is width
    if (habitButtonView === 'app') {
      setHabitColumns(parseInt(windowWidth / 84));
    } else if (habitButtonView === 'list') {
      setHabitColumns(1);
    }
    if (calendarRef.current !== null) {
      const timer = setTimeout(() => {
        calendarRef.current.updateWeekView(
          sub(currentlyLoadedDay, {
            days: 3,
          }),
        );
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [windowWidth, windowHeight, habitButtonView]);

  useEffect(() => {
    setHabitButtonView(habitButtonSettings.habitButtonView);
  }, [habitButtonSettings]);

  return (
    <SafeAreaView
      style={[
        styles.safeAreaContainer,
        {backgroundColor: theme.backgroundColor},
      ]}>
      <CalendarStrip
        ref={calendarRef}
        scrollable={true}
        maxDayComponentSize={58}
        startingDate={sub(getToday(), {days: 3})}
        selectedDate={getToday()}
        onDateSelected={(dateString) => {
          const date = parseDate(formatDate(new Date(dateString)));
          calendarRef.current.updateWeekView(
            sub(date, {
              days: 3,
            }),
          );
          loadDay(date);
        }}
        daySelectionAnimation={{
          type: 'border',
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: theme.borderColor,
        }}
        style={{
          height: 80,
          paddingVertical: 2,
        }}
        calendarColor={theme.navTopBarColor}
        calendarHeaderStyle={{color: theme.textColor, fontSize: 12}}
        highlightDateNumberStyle={{color: theme.textColor, fontSize: 10}}
        highlightDateNameStyle={{color: theme.textColor, fontSize: 10}}
        dateNumberStyle={{color: theme.textColor, fontSize: 12}}
        dateNameStyle={{color: theme.textColor, fontSize: 12}}
        iconContainer={{flex: 0.1, paddingBottom: 10}}
        iconStyle={{height: 25}}
        iconLeft={require('../imgs/left-arrow-white.png')}
        iconRight={require('../imgs/right-arrow-white.png')}
      />
      <FlatList
        contentContainerStyle={[styles.habitContainer]}
        key={habitColumns}
        numColumns={habitColumns}
        data={habitList}
        extraData={habitList}
        keyExtractor={(item) => `${item.id}${item.name}`}
        renderItem={({item}) => (
          <HabitButton
            disabled={isAfter(currentlyLoadedDay, getToday())}
            title={item.name}
            description={item.description}
            textColor={item.colors.textColor}
            backgroundColor={item.colors.backgroundColor} // add styling to make this auto transparent and not dependent on the rgba here
            // backgroundColor={'red'} // add styling to make this auto transparent and not dependent on the rgba here
            textActiveColor={item.colors.textActiveColor}
            backgroundActiveColor={item.colors.backgroundActiveColor}
            completed={item.completed}
            listView={habitButtonView === 'list'}
            onPress={() => {
              // set completed
              item.completed = !item.completed;
              // update habit
              updateHabit(
                item,
                formatDate(new Date(calendarRef.current.getSelectedDate())),
              );
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 17,
    paddingBottom: 17,
  },
  listContainer: {
    alignItems: 'center',
  },
  habitContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 17,
    paddingHorizontal: 17,
  },
  days: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderTopColor: 'lightgray',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  dayTitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  icon: {
    width: 30,
    height: 30,
    margin: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  },
  iconText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  rightNavContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  navButton: {
    paddingHorizontal: 10,
    display: 'flex',
  },
});

export default Habits;
