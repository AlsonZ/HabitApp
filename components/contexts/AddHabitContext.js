import React, {createContext, useState} from 'react';
import Colors from '../settings/Colors';

export const AddHabitContext = createContext();

export const AddHabitProvider = (props) => {
  const [habitDetails, setHabitDetails] = useState({
    name: '',
    category: 'Category', // placeholder text
    description: '',
    schedule: 1, // 1 = daily
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
