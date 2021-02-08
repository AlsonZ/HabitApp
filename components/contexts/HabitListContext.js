import React, {createContext, useEffect, useState} from 'react';
import {
  storeHabit,
  getHabit,
  getDate,
  getLatestHabitData,
} from '../settings/Storage';

export const HabitListContext = createContext();

export const HabitListProvider = (props) => {
  const [habitList, setHabitList] = useState([]);

  // const exampleData = [
  //   {
  //     day: 1,
  //     date: '',
  //     habitData: {},
  //   },
  //   {
  //     day: 2,
  //     date: '',
  //     habitData: {},
  //   },
  // ];

  useEffect(() => {
    const getData = async () => {
      // let habitData = await getHabits();
      // let parsedData = JSON.parse(habitData);
      // setHabitList(parsedData);
      // const fourteenDays = 12096e5;
      const date = getDate();
      // console.log(date);
      const tempLatestHabitData = await getLatestHabitData();
      const endDate = new Date(date.toUTCString());
      endDate.setDate(endDate.getDate() + 14);
      const latestHabitData = tempLatestHabitData
        ? tempLatestHabitData
        : {
            startDate: date,
            endDate: endDate,
            latestDate: date,
            habitDays: [],
          };

      console.log(latestHabitData);
      const startNewSection = () => {};
      // data exists
      if (latestHabitData.habitDays.length > 0) {
        // max size
        if (latestHabitData.habitDays.length >= 14) {
          startNewSection();
        }
        // is in previous section
        if (
          date <= latestHabitData.endDate &&
          date >= latestHabitData.startDate
        ) {
          // load previous section data
          // load new habit data
          // set loaded date as current date, dont use days as it is unreliable
        } else {
          // finish off old section and begin new section
          // also need to load up from previous endDate to current date in the new section
          // It is possible that multiple sections may have passed.
          // startNewSection();
        }
        // previous habit data does not exist
      } else if (latestHabitData.habitDays.length <= 0) {
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
