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
  const [passedDays, setPassedDays] = useState(0);
  const [pastHabitData, setPastHabitData] = useState({});
  const [isNewPastHabitData, setIsNewPastHabitData] = useState(true);
  const [initialUseEffectHasRun, setInitialUseEffectHasRun] = useState(false);
  const date = getDate();
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 14);

  const loadHabitList = async (prevList, newList) => {
    const tempList = prevList.concat(newList);
    setHabitList(tempList);
  };

  const storeEditedPastData = async (pastData, habitListData) => {
    if (pastData) {
      // clone pastHabitData as it should be immutable
      const pastHabitDataCopy = pastData;
      console.log('storing in past data: ' + pastHabitDataCopy);
      // get dates and convert into date Object
      const today = new Date(date);
      // compare today to startDate of latestPastHabitData
      const startDate = new Date(pastHabitDataCopy.startDate);
      const difference = getDateDifference(startDate, today);
      // set new latest date for past habit data
      pastHabitDataCopy.latestDate = date;

      // negative = startDate is in the future, positive = today is n days ahead of startDate
      // replace habitDays array in previous data with new array
      // this allows modification of previous days
      // >= 0 means it also stores up until today
      if (difference >= 0) {
        const maxDays = difference <= 14 ? difference : 14;
        let newHabitDays = [];
        for (let i = 0; i <= maxDays; i++) {
          newHabitDays.push(habitListData[i]);
        }
        pastHabitDataCopy.habitDays = newHabitDays;
      } else {
        // this should not happen
        // contact admin
      }
      if (isNewPastHabitData) {
        console.log('New past data');
        storeNewPastHabitData(pastHabitDataCopy);
      } else if (!isNewPastHabitData) {
        console.log('edit past data');
        editPastHabitData(pastHabitDataCopy);
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
      const generatePrevHabitList = async (pastHabitData) => {
        const tempList = [];
        for (let i = 0; i < pastHabitData.habitDays.length; i++) {
          tempList.push(pastHabitData.habitDays[i]);
        }
        // setPrevHabitList(tempList);
        return tempList;
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
        // setNewHabitList(tempList);
        return tempList;
      };
      const generatePassedDays = (startDate, today) => {
        const difference = getDateDifference(
          new Date(startDate),
          new Date(today),
        );
        setPassedDays(difference);
      };

      // data exists
      if (latestPastHabitData.habitDays.length > 0) {
        console.log('>0');
        generatePassedDays(latestPastHabitData.startDate, date);
        // max size
        if (latestPastHabitData.habitDays.length >= 14) {
          console.log('>=14');
          startNewSection();
        }
        // is in previous section
        const prevList = await generatePrevHabitList(latestPastHabitData);
        const newList = await generateNewHabitList(latestPastHabitData);
        if (
          date <= latestPastHabitData.endDate &&
          date >= latestPastHabitData.startDate
        ) {
          console.log('Date is in previous Section');
          // load the created lists.
          await loadHabitList(prevList, newList);
        } else {
          console.log('Date is outside previous Section');
          // create combined list to update
          const comboList = prevList.concat(newList);
          // update old data to complete previous section
          await storeEditedPastData(latestPastHabitData, comboList);
          // also need to load up from previous endDate to current date in the new section
          // It is possible that multiple sections may have passed.
          // check difference by every 14 days
          // then multiply 14x to get new startDate
          const oldStartDate = new Date(latestPastHabitData.startDate);
          const today = new Date(date);
          const difference = getDateDifference(oldStartDate, today);
          const multiplier = parseInt(difference / 14);
          // create new start date
          const newStartDate = new Date(oldStartDate.toISOString());
          newStartDate.setDate(newStartDate.getDate() + 14 * multiplier);
          // create new end date
          const newEndDate = new Date(newStartDate.toISOString());
          newEndDate.setDate(newEndDate.getDate() + 14);

          const newHabitData = {
            startDate: newStartDate.toISOString(),
            endDate: newEndDate.toISOString(),
            latestDate: date,
            habitDays: [],
          };
          setPastHabitData(newHabitData);
          generatePassedDays(newStartDate.toISOString(), today.toISOString());
          startNewSection();
        }
        // previous habit data does not exist
      } else if (latestPastHabitData.habitDays.length <= 0) {
        console.log('<=0');
        startNewSection();
      }
    };
    getData();
    setInitialUseEffectHasRun(true);
  }, []);

  useEffect(() => {
    if (initialUseEffectHasRun) {
      storeEditedPastData(pastHabitData, habitList);
    }
  }, [habitList]);
  return (
    <HabitListContext.Provider value={[habitList, setHabitList, passedDays]}>
      {props.children}
    </HabitListContext.Provider>
  );
};
