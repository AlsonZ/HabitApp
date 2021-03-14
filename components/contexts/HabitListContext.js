import React, {createContext, useEffect, useState} from 'react';
import {
  getDate,
  getLatestPastHabitData,
  getDayHabit,
  storeNewPastHabitData,
  getDateDifference,
  editPastHabitData,
  getCalendarHabitList,
} from '../settings/Storage';
import {add, format, isBefore, isAfter, isEqual, parse, sub} from 'date-fns';
import {config} from '../config/config';

export const HabitListContext = createContext();

export const HabitListProvider = (props) => {
  const [habitList, setHabitList] = useState([]);

  const parseDate = (dateString) => {
    return parse(dateString, 'dd/MM/yyyy', new Date());
  };
  const formatDate = (dateObj) => {
    return format(dateObj, 'dd/MM/yyyy');
  };
  const getToday = () => {
    return parseDate(formatDate(new Date()));
  };
  const assignNewHabitDates = (habit) => {
    // if day is today or day < today
    // add to date until it is in the future
    const updateDate = (newHabit) => {
      let newNextDate = newHabit.lastOccuranceDate
        ? newHabit.lastOccuranceDate
        : newHabit.startDate;
      console.log('starts as:', newNextDate);
      // repeat +daydifference until no longer before today
      while (isBefore(parseDate(newNextDate), getToday())) {
        // get latestOccurDate + weeks
        newNextDate = formatDate(
          add(parseDate(newNextDate), newHabit.scheduleType.duration),
        );
      }
      return newNextDate;
    };
    // clone habit
    const newHabit = JSON.parse(JSON.stringify(habit));
    // updateNextOccurance
    if (
      habit.scheduleType.name === config.scheduleType.weekly.name ||
      habit.scheduleType.name === config.scheduleType.fortnightly.name ||
      habit.scheduleType.name === config.scheduleType.monthly.name ||
      habit.scheduleType.name === config.scheduleType.yearly.name ||
      habit.scheduleType.name === config.scheduleType.custom.name
    ) {
      newHabit.nextOccuranceDate = updateDate(newHabit);
    }
    console.log(habit.name, 'is being updated to:', newHabit.nextOccuranceDate);
    // update storage too
    return newHabit;
  };
  const updateAndStoreLoadedHabitDates = (habit) => {
    // do not update next date as it will be updated by assignNewHabitDates tomorrow/day after
    // clone habit
    const newHabit = JSON.parse(JSON.stringify(habit));
    // update last date to today
    newHabit.lastOccuranceDate = formatDate(getToday());
    console.log(newHabit.lastOccuranceDate, 'is now');
    // store habit into list

    // store habit into past habit data
  };

  const loadCurrentlyActiveDayHabits = async (day) => {
    // this is for the current day's habits only
    // past habits should load from past habit data storage
    // future habits are loaded with this too
    const calendarHabitList = await getCalendarHabitList();
    setHabitList([]);
    if (calendarHabitList.length > 0) {
      calendarHabitList.forEach((habit) => {
        if (habit.archived) {
          console.log('Move to archived habits list');
        }
        if (habit.scheduleType.name === config.scheduleType.everyday.name) {
          setHabitList((prevState) => [...prevState, habit]);
        } else if (
          habit.scheduleType.name === config.scheduleType.weekly.name ||
          habit.scheduleType.name === config.scheduleType.fortnightly.name ||
          habit.scheduleType.name === config.scheduleType.monthly.name ||
          habit.scheduleType.name === config.scheduleType.yearly.name ||
          habit.scheduleType.name === config.scheduleType.custom.name
        ) {
          if (
            isEqual(parseDate(habit.nextOccuranceDate), day) ||
            isEqual(parseDate(habit.lastOccuranceDate), day)
          ) {
            setHabitList((prevState) => [...prevState, habit]);
            if (isEqual(day, getToday())) {
              // mabe move this elsewhere as it only applies if it is the current day
              updateAndStoreLoadedHabitDates(habit);
            }
          } else if (isAfter(parseDate(habit.nextOccuranceDate), day)) {
            console.log(habit.name, 'is in the future');
            // do nothing, this is normal
          } else if (isBefore(parseDate(habit.nextOccuranceDate), day)) {
            console.log(habit.name, 'is in the past');
            const updatedHabit = assignNewHabitDates(habit); // this also updates storage
            // incase updateddates is now today
            if (isEqual(parseDate(updatedHabit.nextOccuranceDate), day)) {
              setHabitList((prevState) => [...prevState, updatedHabit]);
              if (isEqual(day, getToday())) {
                // mabe move this elsewhere as it only applies if it is the current day
                updateAndStoreLoadedHabitDates(updatedHabit);
              }
            }
          }
        } else if (
          habit.scheduleType.name === config.scheduleType.weekday.name
        ) {
          console.log(habit.name, 'Weekday');
        } else if (
          habit.scheduleType.name === config.scheduleType.singleTime.name
        ) {
          console.log(habit.name, 'Single Time');
        } else {
          console.log(habit.name, 'TBA');
        }
      });
    }
  };

  useEffect(() => {
    const day = getToday();
    loadCurrentlyActiveDayHabits(day); // for today, is date obj
  }, []);

  return (
    <HabitListContext.Provider
      value={[habitList, setHabitList, loadCurrentlyActiveDayHabits]}>
      {props.children}
    </HabitListContext.Provider>
  );
};
