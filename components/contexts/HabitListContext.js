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
  const [prevHabitList, setPrevHabitList] = useState([]);
  const [newHabitList, setNewHabitList] = useState([]);
  const [currentDay, setCurrentDay] = useState(0);
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
      // clone pastHabitData as it should be immutable
      const pastHabitDataClone = pastHabitData;
      console.log('storing in past data: ' + pastHabitDataClone);
      // get dates and convert into date Object
      const today = new Date(date);
      // compare today to startDate of latestPastHabitData
      const startDate = new Date(pastHabitDataClone.startDate);
      const difference = getDateDifference(startDate, today);
      // set new latest date for past habit data
      pastHabitDataClone.latestDate = date;

      // negative = startDate is in the future, positive = today is n days ahead of startDate
      // replace habitDays array in previous data with new array
      // this allows modification of previous days
      // >= 0 means it also stores up until today
      if (difference >= 0) {
        // const maxDays = 14;
        // if(difference<=14) {
        //   maxDays = difference;
        // }
        const maxDays = difference <= 14 ? difference : 14;
        let newHabitDays = [];
        for (let i = 0; i <= maxDays; i++) {
          newHabitDays.push(habitList[i]);
        }
        pastHabitDataClone.habitDays = newHabitDays;
      } else {
        // this should not happen
        // error message?
        // contact admin
      }
      if (isNewPastHabitData) {
        console.log('New past data');
        storeNewPastHabitData(pastHabitDataClone);
      } else if (!isNewPastHabitData) {
        console.log('edit past data');
        editPastHabitData(pastHabitDataClone);
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
      // const calculateDateDifferenceToday = () => {
      //   const today = new Date(date);
      //   const startDate = new Date(latestPastHabitData.startDate);
      //   // compare today to startDate of latestPastHabitData
      //   const difference = getDateDifference(startDate, today);
      //   setCurrentDay(difference);
      //   return difference;
      // };
      const generatePrevHabitList = async (pastHabitData) => {
        const tempList = [];
        for (let i = 0; i < pastHabitData.habitDays.length; i++) {
          tempList.push(pastHabitData.habitDays[i]);
        }
        setPrevHabitList(tempList);
      };
      const generateNewHabitList = async (pastHabitData) => {
        const length = pastHabitData.habitDays
          ? pastHabitData.habitDays.length
          : 1;
        const tempList = [];
        for (let day = length + 1; day <= 14; day++) {
          const habitDayJSON = await getDayHabit(day);
          const habitDay = JSON.parse(habitDayJSON);
          tempList.push(habitDay);
        }
        setNewHabitList(tempList);
      };
      // data exists
      if (latestPastHabitData.habitDays.length > 0) {
        console.log('>0');
        // const difference = calculateDateDifferenceToday();
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
          await generatePrevHabitList(latestPastHabitData);
          await generateNewHabitList(latestPastHabitData);
          // const tempHabitList = await createCombinedSection(difference);
          // setHabitList(tempHabitList);
          // set loaded date as current date, dont use days as it is unreliable
        } else {
          console.log('not inside previous section date');
          // finish off old section and begin new section
          await generatePrevHabitList(latestPastHabitData);
          await generateNewHabitList(latestPastHabitData);
          // also need to load up from previous endDate to current date in the new section
          // It is possible that multiple sections may have passed.
          startNewSection();
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
    if (initialUseEffectHasRun && newHabitList) {
      console.log(!!newHabitList);
      const tempList = prevHabitList.concat(newHabitList);
      setHabitList(tempList);
    }
  }, [newHabitList]);

  useEffect(() => {
    if (initialUseEffectHasRun) {
      storeDayInPastData();
    }
  }, [habitList]);
  return (
    <HabitListContext.Provider value={[habitList, setHabitList, currentDay]}>
      {props.children}
    </HabitListContext.Provider>
  );
};
