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
            startDate: date.toUTCString(),
            endDate: endDate.toUTCString(),
            latestDate: date.toUTCString(),
            habitDays: [],
          };

      console.log(latestHabitData);
      // const endDate = latestHabitData.endDate;
      // const startNewSection = () => {};
      // check if any days have already been done
      // if (latestHabitData.habitDays.length > 0) {
      // } else if (latestHabitData.habitDays.length >= 14) {
      // check if latestHabitData is > 14 (which means it has finished)
      // }
      // if(endDate )

      // get latestHabitData finish date
      // if latestHabitData finish date < current date (then start new spring AND check if current date is only 1 day ahead)
      // if it is > 1 day ahead, check how many days and input habits accordingly.

      // if latestHabitData < 14 (currently in a spring)
      // load latestHabitData until max, get current day it is up to, check date is only 1 day ahead of last known date
      // if more than 1 day head, check and input habits accordingly
      // if it turns out to be more than 14 days then start a new section
      // if it not more than load up old data until finished, then load new habits
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
