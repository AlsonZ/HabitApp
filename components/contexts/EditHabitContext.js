import React, {createContext, useEffect, useState} from 'react';
import {getAllHabits} from '../settings/Storage';

export const EditHabitContext = createContext();

export const EditHabitProvider = (props) => {
  const [allHabits, setAllHabits] = useState([]);
  const [reloadContext, setReloadContext] = useState(false);

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
  }, [reloadContext]);

  return (
    <EditHabitContext.Provider
      value={[allHabits, setAllHabits, reloadContext, setReloadContext]}>
      {props.children}
    </EditHabitContext.Provider>
  );
};
