import React, {createContext, useEffect, useState} from 'react';
import {
  storeHabit,
  getHabit,
  getDate,
  getLatestPastHabitData,
  getDayHabit,
} from '../settings/Storage';

export const HabitListContext = createContext();

export const HabitListProvider = (props) => {
  const [habitList, setHabitList] = useState([]);

  // const exampleData = [
  //   [{name: 'day1 habit1'}, {name: 'day1 habit2'}],
  //   [{name: 'day2 habit1'}, {name: 'day2 habit2'}]
  // ];

  useEffect(() => {
    const getData = async () => {
      const date = getDate();
      // console.log(date);
      const tempLatestPastHabitData = await getLatestPastHabitData();
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 14);
      const latestPastHabitData = tempLatestPastHabitData
        ? tempLatestPastHabitData
        : {
            startDate: date,
            endDate: endDate.toISOString(),
            latestDate: date,
            habitDays: [],
          };

      console.log(latestPastHabitData);
      const startNewSection = async () => {
        const tempHabitList = [];
        for (let i = 1; i <= 14; i++) {
          // get habit day data
          const habitDayJSON = await getDayHabit(i);
          const habitDay = JSON.parse(habitDayJSON);
          // insert into temp array
          tempHabitList.push(habitDay);
        }
        setHabitList(tempHabitList);
      };
      // data exists
      if (latestPastHabitData.habitDays.length > 0) {
        console.log('>0');
        // max size
        if (latestPastHabitData.habitDays.length >= 14) {
          console.log('>=14');
          startNewSection();
        }
        // is in previous section
        if (
          date <= latestPastHabitData.endDate &&
          date >= latestPastHabitData.startDate
        ) {
          console.log('inside previous section date');
          // load previous section data
          // load new habit data
          // set loaded date as current date, dont use days as it is unreliable
        } else {
          console.log('not inside previous section date');
          // finish off old section and begin new section
          // also need to load up from previous endDate to current date in the new section
          // It is possible that multiple sections may have passed.
          // startNewSection();
        }
        // previous habit data does not exist
      } else if (latestPastHabitData.habitDays.length <= 0) {
        console.log('<=0');
        startNewSection();
        // add day 1 to habitDays of latest data? or do this elsewhere such as when content has been loaded and then do it
        // that part will just be useeffect triggered on change of habitlist items and also will update the saved data
        // my habit object also need an active/not active variable to show previously completed habits
      }
    };
    getData();
  }, []);

  useEffect(() => {
    // storeHabits(habitList);
  }, [habitList]);

  return (
    <HabitListContext.Provider value={[habitList, setHabitList]}>
      {props.children}
    </HabitListContext.Provider>
  );
};
