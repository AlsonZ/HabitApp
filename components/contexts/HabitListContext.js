import React, {createContext, useEffect, useState} from 'react';
import {storeHabits, getHabits} from '../settings/Storage';

export const HabitListContext = createContext();

export const HabitListProvider = (props) => {
  const [habitList, setHabitList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let habitData = await getHabits();
      let parsedData = JSON.parse(habitData);
      setHabitList(parsedData);
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
