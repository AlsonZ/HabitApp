import React, {createContext, useEffect, useState} from 'react';
import {DefaultColors as Colors} from '../settings/Colors';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export const AddHabitContext = createContext();

export const AddHabitProvider = (props) => {
  const initialHabitDetails = (id) => ({
    id: id,
    name: '',
    category: 'Category', // placeholder text
    description: '',
    // schedule: 1, // 1 = daily
    schedule: [
      {day: 1, active: true},
      {day: 2, active: true},
      {day: 3, active: true},
      {day: 4, active: true},
      {day: 5, active: true},
      {day: 6, active: true},
      {day: 7, active: true},
      {day: 8, active: true},
      {day: 9, active: true},
      {day: 10, active: true},
      {day: 11, active: true},
      {day: 12, active: true},
      {day: 13, active: true},
      {day: 14, active: true},
    ],
    dailySchedule: 1, // 1 = once per day
    colors: {
      // default colors here
      textColor: Colors.gray,
      backgroundColor: Colors.transparent,
      textActiveColor: Colors.white,
      backgroundActiveColor: Colors.blue,
    },
    // completed: false,
    order: 1,
  });
  const [habitDetails, setHabitDetails] = useState(
    initialHabitDetails(uuidv4()),
  );
  const [reloadContext, setReloadContext] = useState(false);

  useEffect(() => {
    setHabitDetails(initialHabitDetails(uuidv4()));
  }, [reloadContext]);

  return (
    <AddHabitContext.Provider
      value={[habitDetails, setHabitDetails, reloadContext, setReloadContext]}>
      {props.children}
    </AddHabitContext.Provider>
  );
};
