import React, {createContext, useState} from 'react';
import {DefaultColors as Colors} from '../settings/Colors';

export const AddHabitContext = createContext();

export const AddHabitProvider = (props) => {
  const [habitDetails, setHabitDetails] = useState({
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
    order: 1,
  });

  return (
    <AddHabitContext.Provider value={[habitDetails, setHabitDetails]}>
      {props.children}
    </AddHabitContext.Provider>
  );
};
