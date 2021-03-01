import React, {createContext, useEffect, useState} from 'react';
import {
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
  const [reloadContext, setReloadContext] = useState(false);
  const [initialUseEffectHasRun, setInitialUseEffectHasRun] = useState(false);
  const date = getDate();
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 14);

  const storeEditedPastData = async (pastData, habitListData) => {
    if (pastData) {
      // clone pastHabitData as it should be immutable
      const pastHabitDataCopy = JSON.parse(JSON.stringify(pastData));
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
        console.log('Store New past data in HabitListContext');
        storeNewPastHabitData(pastHabitDataCopy);
      } else if (!isNewPastHabitData) {
        console.log('Store Edit past data in HabitListContext');
        editPastHabitData(pastHabitDataCopy);
      }
      setIsNewPastHabitData(false);
    }
  };

  useEffect(() => {
    let loading = false;
    const getData = async () => {
      console.log('Currently Getting Data, loading: ' + loading);
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

      console.log('This is latestPastHabitData: ' + latestPastHabitData);
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
          : 0;
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
        console.log('PastHabitData.habitDays.length is: >0');
        generatePassedDays(latestPastHabitData.startDate, date);
        // max size
        if (latestPastHabitData.habitDays.length >= 14) {
          console.log('PastHabitData.habitDays.length is: >=14');
          startNewSection();
        }
        // is in previous section
        const prevList = await generatePrevHabitList(latestPastHabitData);
        const newList = await generateNewHabitList(latestPastHabitData);
        if (
          date <= latestPastHabitData.endDate &&
          date >= latestPastHabitData.startDate
        ) {
          console.log('Date is inside previous Section');
          // create combo list
          const tempList = prevList.concat(newList);
          // replace today with getDay of today
          const habitDayJSON = await getDayHabit(
            latestPastHabitData.habitDays.length,
          );
          const habitDay = JSON.parse(habitDayJSON);
          tempList[prevList.length - 1] = habitDay;
          // change active state for today's habits by looking at prevHabits
          tempList[prevList.length - 1].forEach((newHabitItem) => {
            for (let i = 0; i < prevList[prevList.length - 1].length; i++) {
              if (newHabitItem.name === prevList[prevList.length - 1][i].name) {
                // set completed
                newHabitItem.completed =
                  prevList[prevList.length - 1][i].completed;
                // splice habit from prevList
                prevList[prevList.length - 1].splice(i, 1);
                // break out of inner loop
                break;
              }
            }
          });

          setHabitList(tempList);
        } else {
          console.log('Date is outside previous Section');
          // create combined list to update
          const comboList = prevList.concat(newList);
          // update old data to complete previous section
          await storeEditedPastData(latestPastHabitData, comboList);
          // It is possible that multiple sections may have passed.
          const oldStartDate = new Date(latestPastHabitData.startDate);
          const today = new Date(date);
          const difference = getDateDifference(oldStartDate, today);
          // divide difference by every 14 days
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
        console.log('PastHabitData.habitDays.length is: <=0');
        startNewSection();
      }
      loading = false;
      setInitialUseEffectHasRun(true);
    };
    console.log('Reloading Context in HabitListContext');
    if (!loading) {
      loading = true;
      getData();
    }
  }, [reloadContext]);

  useEffect(() => {
    if (initialUseEffectHasRun) {
      console.log('HabitList has been modified and is storing data again');
      storeEditedPastData(pastHabitData, habitList);
    }
  }, [habitList]);
  return (
    <HabitListContext.Provider
      value={[
        habitList,
        setHabitList,
        passedDays,
        reloadContext,
        setReloadContext,
      ]}>
      {props.children}
    </HabitListContext.Provider>
  );
};
