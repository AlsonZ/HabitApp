import React, {createContext, useEffect, useState} from 'react';
import {
  getDate,
  getLatestPastHabitData,
  getDayHabit,
  storeNewPastHabitData,
  getDateDifference,
  getCalendarHabitList,
  storeCalendarHabit,
  editCalendarHabit,
  deleteAllCalendarHabits,
  storeCalendarPastHabitDataOfDate,
  editCalendarPastHabitDataOfDate,
  getCalendarPastHabitDataOfDate,
  delteCalendarPastHabitDataOfYear,
} from '../storage/Storage';
import {
  add,
  format,
  isBefore,
  isAfter,
  isEqual,
  parse,
  sub,
  getDay,
} from 'date-fns';
import {config} from '../config/config';

export const HabitListContext = createContext();

export const HabitListProvider = (props) => {
  const [habitList, setHabitList] = useState([]);
  const [loadedAllHabits, setLoadedAllHabits] = useState(false);
  const [selectedDateisToday, setSelectedDateisToday] = useState(false);
  const [currentlyLoadedDay, setCurrentlyLoadedDay] = useState(null);
  const [reloadContext, setReloadContext] = useState(false);

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
  const updateAndStoreLoadedHabitDates = async (habit) => {
    console.log('updateAndStoreLoadedHabitDates is being run');
    // do not update next date as it will be updated by assignNewHabitDates tomorrow/day after
    // clone habit
    const newHabit = JSON.parse(JSON.stringify(habit));
    // update last date to today
    // console.log(
    //   newHabit.lastOccuranceDate,
    //   'is last Occurance Date for:',
    //   newHabit.name,
    // );
    newHabit.lastOccuranceDate = formatDate(getToday());
    // edit habit into list, not store as habit already exists
    await editCalendarHabit(newHabit);
    // store habit into past habit data, as past habit should not exist yet on first run
    // store does nothing if the past habit already exists so doesnt replace old data
    await storeCalendarPastHabitDataOfDate(newHabit, formatDate(getToday()));
  };

  const loadCurrentlyActiveDayHabits = async (day) => {
    // this is for the current day's habits only
    // past habits should load from past habit data storage
    // future habits are loaded with this too
    const calendarHabitList = await getCalendarHabitList();
    setHabitList([]);
    if (calendarHabitList.length > 0) {
      // calendarHabitList.forEach(async (habit) => {
      for (const habit of calendarHabitList) {
        if (habit.archived) {
          console.log('Move to archived habits list');
        }
        if (habit.scheduleType.name === config.scheduleType.everyday.name) {
          setHabitList((prevState) => [...prevState, habit]);
          if (
            isEqual(day, getToday()) &&
            habit.lastOccuranceDate !== formatDate(getToday())
          ) {
            // mabe move this elsewhere as it only applies if it is the current day
            await updateAndStoreLoadedHabitDates(habit);
          }
        } else if (
          habit.scheduleType.name === config.scheduleType.weekly?.name ||
          habit.scheduleType.name === config.scheduleType.fortnightly?.name ||
          habit.scheduleType.name === config.scheduleType.monthly?.name ||
          habit.scheduleType.name === config.scheduleType.yearly?.name ||
          habit.scheduleType.name === config.scheduleType.custom?.name
        ) {
          if (
            isEqual(parseDate(habit.nextOccuranceDate), day) ||
            isEqual(parseDate(habit.lastOccuranceDate), day)
          ) {
            console.log(habit.name, 'is current day');
            setHabitList((prevState) => [...prevState, habit]);
            if (
              isEqual(day, getToday()) &&
              habit.lastOccuranceDate !== formatDate(getToday())
            ) {
              // mabe move this elsewhere as it only applies if it is the current day
              await updateAndStoreLoadedHabitDates(habit);
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
              if (
                isEqual(day, getToday()) &&
                habit.lastOccuranceDate !== formatDate(getToday())
              ) {
                // mabe move this elsewhere as it only applies if it is the current day
                await updateAndStoreLoadedHabitDates(updatedHabit);
              }
            }
          }
        } else if (
          habit.scheduleType.name === config.scheduleType.weekday?.name
        ) {
          console.log(habit.name, 'Weekday');
          // get today's weekday
          const weekdayAtDay = getDay(day);
          // get and loop habit.scheduleType.weekday.day
          for (const weekdayKey in habit.scheduleType.days) {
            // if day(key) is true and === today weekday load it
            if (
              habit.scheduleType.days[weekdayKey] &&
              parseInt(weekdayKey) === weekdayAtDay
            ) {
              setHabitList((prevState) => [...prevState, habit]);
              if (
                isEqual(day, getToday()) &&
                habit.lastOccuranceDate !== formatDate(getToday())
              ) {
                // mabe move this elsewhere as it only applies if it is the current day
                await updateAndStoreLoadedHabitDates(habit);
              }
            }
          }
        } else if (
          habit.scheduleType.name === config.scheduleType.singleTime?.name
        ) {
          console.log(habit.name, 'Single Time');
        } else {
          console.log(habit.name, 'TBA');
        }
      }
      // );
    }
    setLoadedAllHabits(true);
  };

  const updateHabit = async (habit, dateString) => {
    await editCalendarPastHabitDataOfDate(habit, dateString);
  };

  const updateCompletedHabits = async (date) => {
    // get past data
    const pastHabitData = await getCalendarPastHabitDataOfDate(
      formatDate(date),
    );
    // if habit has been deleted dont load it for today?
    // will need to delete habit for past data as well then
    // clone habitList
    const habitListCopy = JSON.parse(JSON.stringify(habitList));
    // loop through habitlist
    for (let habit of habitListCopy) {
      // loop through pastHabitData
      for (const pastHabit of pastHabitData) {
        // if equal id then set habitlist completed to pasthabitdata completed
        if (habit.id === pastHabit.id) {
          habit.completed = pastHabit.completed;
          // console.log(habit.name, 'is completed:', habit.completed);
          break;
        }
      }
    }
    console.log('updating habitList');
    setHabitList(habitListCopy);
  };

  const loadDay = async (date) => {
    if (isBefore(date, getToday())) {
      console.log('loadDay isBefore');
      const pastHabitData = await getCalendarPastHabitDataOfDate(
        formatDate(date),
      );
      setHabitList(pastHabitData);
    } else if (isEqual(date, getToday())) {
      console.log('loadDay isEqual');
      // load
      console.log('before loadCurrentlyActive');
      await loadCurrentlyActiveDayHabits(date);
      // trigger updateCompletedHabits
      setSelectedDateisToday(date);
    } else if (isAfter(date, getToday())) {
      console.log('loadDay isAfter');
      // load
      await loadCurrentlyActiveDayHabits(date);
    }
    setCurrentlyLoadedDay(date);
  };

  useEffect(() => {
    if (loadedAllHabits && selectedDateisToday) {
      console.log('this update runs');
      const update = async () => {
        await updateCompletedHabits(selectedDateisToday);
      };
      update();
    }
  }, [loadedAllHabits, selectedDateisToday]);

  useEffect(() => {
    let loading = false;
    const day = getToday();
    const createPlaceholderHabits = async () => {
      // await deleteAllCalendarHabits();
      const defaultColors = {
        textColor: 'gray',
        backgroundColor: 'transparent',
        textActiveColor: 'black',
        backgroundActiveColor: 'lightblue',
      };
      const habitList = [
        {
          id: 1,
          name: 'daily',
          description: 'test1',
          colors: defaultColors,
          archived: false,
          frequency: 1,
          scheduleType: config.scheduleType.everyday,
          startDate: formatDate(new Date()), // will be chosen by user
          endDate: null,
          lastOccuranceDate: null,
          // will be startdate by default then changes later,
          // stays current day if loaded until next day,
          // where today will be > nextoccurdate in which then it will be updated
          nextOccuranceDate: formatDate(new Date()), // should be editable for user as it might screw up
          completed: false,
        },
        {
          id: 2,
          name: 'weekly',
          description: 'test2',
          colors: defaultColors,
          archived: false,
          frequency: 1,
          scheduleType: config.scheduleType.weekly,
          startDate: formatDate(new Date()),
          endDate: null,
          lastOccuranceDate: null,
          nextOccuranceDate: formatDate(new Date()),
          completed: false,
        },
        {
          id: 3,
          name: 'weeklyNew',
          description: 'test3',
          colors: defaultColors,
          archived: false,
          frequency: 1,
          scheduleType: config.scheduleType.weekly,
          startDate: formatDate(add(new Date(), {days: 2})),
          endDate: null,
          lastOccuranceDate: null,
          nextOccuranceDate: formatDate(add(new Date(), {days: 2})),
          completed: false,
        },
        {
          id: 4,
          name: 'weeklyOld',
          description: 'test3',
          colors: defaultColors,
          archived: false,
          frequency: 1,
          scheduleType: config.scheduleType.weekly,
          startDate: formatDate(sub(new Date(), {days: 14})),
          endDate: null,
          lastOccuranceDate: null,
          nextOccuranceDate: formatDate(sub(new Date(), {days: 7})),
          completed: false,
        },
        {
          id: 5,
          name: 'monthly',
          description: 'test4',
          colors: defaultColors,
          archived: false,
          frequency: 1,
          scheduleType: config.scheduleType.monthly,
          startDate: formatDate(new Date()),
          endDate: null,
          lastOccuranceDate: null,
          nextOccuranceDate: formatDate(new Date()),
          completed: false,
        },
      ];
      for (let i = 0; i < habitList.length; i++) {
        const success = await storeCalendarHabit(habitList[i]);
        console.log('Added: ', habitList[i].name, success);
      }
    };
    const getData = async () => {
      loading = true;
      // await createPlaceholderHabits();
      // await loadCurrentlyActiveDayHabits(day); // for today, is date obj
      await loadDay(day);
      loading = false;
    };
    if (!loading) {
      getData();
    }
  }, [reloadContext]);

  const reload = () => {
    setReloadContext(!reloadContext);
  };

  return (
    <HabitListContext.Provider
      value={[habitList, updateHabit, loadDay, currentlyLoadedDay, reload]}>
      {props.children}
    </HabitListContext.Provider>
  );
};
