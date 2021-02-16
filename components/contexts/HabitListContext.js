import React, {createContext, useEffect, useState} from 'react';
import {
  storeHabit,
  getHabit,
  getDate,
  getLatestPastHabitData,
  getDayHabit,
  storeNewPastHabitData,
  getDateDifference,
  editPastHabitData,
} from '../settings/Storage';

export const HabitListContext = createContext();

export const HabitListProvider = (props) => {
  const [habitList, setHabitList] = useState([]);
  const [pastHabitData, setPastHabitData] = useState({});
  const [isNewPastHabitData, setIsNewPastHabitData] = useState(true);
  const [initialUseEffectHasRun, setInitialUseEffectHasRun] = useState(false);
  const date = getDate();
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 14);

  // const exampleData = [
  //   [{name: 'day1 habit1'}, {name: 'day1 habit2'}],
  //   [{name: 'day2 habit1'}, {name: 'day2 habit2'}]
  // ];

  const storeDayInPastData = async () => {
    if (pastHabitData) {
      console.log('storing in past data' + pastHabitData);
      // get dates and convert into date Object
      const today = new Date(date);
      const startDate = new Date(pastHabitData.startDate);
      // compare today to startDate of latestPastHabitData
      const difference = getDateDifference(startDate, today);
      // negative = startDate is in the future, positive = today is n days ahead of startDate
      // replace habitDays array in previous data with new array
      // this allows modification of previous days
      // >= 0 means it also stores today
      if (difference >= 0) {
        let newHabitDays = [];
        for (let i = 0; i <= difference; i++) {
          newHabitDays.push(habitList[i]);
        }
        pastHabitData.habitDays = newHabitDays;
      } else {
        // this should not happen
        // error message?
        // contact admin
      }
      if (isNewPastHabitData) {
        console.log('New past data');
        storeNewPastHabitData(pastHabitData);
      } else if (!isNewPastHabitData) {
        console.log('edit past data');
        editPastHabitData(pastHabitData);
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      const tempLatestPastHabitData = await getLatestPastHabitData();
      const latestPastHabitData = (await tempLatestPastHabitData)
        ? tempLatestPastHabitData
        : {
            startDate: date,
            endDate: endDate.toISOString(),
            latestDate: date,
            habitDays: [],
          };
      if (!tempLatestPastHabitData) {
        setIsNewPastHabitData(true);
      } else {
        setIsNewPastHabitData(false);
      }

      console.log(
        'temp latest past habit data is: ' + !!tempLatestPastHabitData,
      );
      console.log(latestPastHabitData);
      setPastHabitData(latestPastHabitData);
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
        // store the newly created day
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
    setInitialUseEffectHasRun(true);
  }, []);

  useEffect(() => {
    if (initialUseEffectHasRun) {
      storeDayInPastData();
    }
  }, [habitList]);

  return (
    <HabitListContext.Provider value={[habitList, setHabitList]}>
      {props.children}
    </HabitListContext.Provider>
  );
};
