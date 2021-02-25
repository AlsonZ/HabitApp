import React, {createContext, useEffect, useState} from 'react';
import {getAllHabits} from '../settings/Storage';

export const EditHabitContext = createContext();

export const EditHabitProvider = (props) => {
  const [allHabits, setAllHabits] = useState([]);

  useEffect(() => {
    let loading = false;
    const getData = async () => {
      const allHabitsData = await getAllHabits();
      setAllHabits(allHabitsData);
      loading = false;
    };
    if (!loading) {
      loading = true;
      getData();
    }
  }, []);

  return (
    <EditHabitContext.Provider value={[allHabits, setAllHabits]}>
      {props.children}
    </EditHabitContext.Provider>
  );
};
