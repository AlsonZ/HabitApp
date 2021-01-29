import React, {createContext, useEffect, useState} from 'react';
import {storeHabits, getHabits} from '../settings/Storage';

export const HabitListContext = createContext();

export const HabitListProvider = (props) => {
  const [habitList, setHabitList] = useState([]);

  // const setHabitList = (value) => {
  //   if (value) {
  //     storeHabits(value);
  //     setHabitListState(value);
  //   }
  // };

  useEffect(() => {
    // getHabits()
    // setHabitList(getHabits());
    // let habitData;
    const getData = async () => {
      let habitData = await getHabits();
      console.log('this is useEffect: ' + habitData);

      let parsedData = JSON.parse(habitData);
      setHabitList(parsedData);
    };
    getData();
  }, []);

  // useEffect(() => {
  //   storeHabits(habitList);
  //   console.log(habitList);
  // }, [habitList]);

  return (
    <HabitListContext.Provider value={[habitList, setHabitList]}>
      {props.children}
    </HabitListContext.Provider>
  );
};
