import React, {createContext, useEffect, useState} from 'react';
import {getCalendarHabitList} from '../storage/Storage';

export const EditHabitContext = createContext();

export const EditHabitProvider = (props) => {
  const [allHabits, setAllHabits] = useState([]);
  const [reloadContext, setReloadContext] = useState(false);

  useEffect(() => {
    let loading = false;
    const getData = async () => {
      const allHabitsData = await getCalendarHabitList();
      setAllHabits(allHabitsData);
      loading = false;
    };
    if (!loading) {
      loading = true;
      getData();
    }
  }, [reloadContext]);

  const reload = () => {
    setReloadContext(!reloadContext);
  };

  return (
    <EditHabitContext.Provider value={[allHabits, setAllHabits, reload]}>
      {props.children}
    </EditHabitContext.Provider>
  );
};
