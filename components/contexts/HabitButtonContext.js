import React, {createContext, useEffect, useState} from 'react';
import {Colors} from '../settings/Colors';
import {getDefaultHabitButton} from '../settings/Storage';

export const HabitButtonContext = createContext();

export const HabitButtonProvider = (props) => {
  const [habitButtonSettings, setHabitButtonSettings] = useState({
    habitButtonView: 'list', // or app
    colors: {
      textColor: Colors.gray,
      backgroundColor: Colors.transparent,
      textActiveColor: Colors.border,
      backgroundActiveColor: Colors.white,
    },
  });
  const [reloadContext, setReloadContext] = useState(false);

  useEffect(() => {
    let loading = false;
    const getData = async () => {
      loading = true;
      const settings = await getDefaultHabitButton();
      if (Object.keys(settings).length !== 0) {
        setHabitButtonSettings(settings);
      }
      loading = false;
    };
    if (!loading) {
      getData();
    }
    console.log('this is habit button settings');
    console.log(habitButtonSettings);
  }, [reload]);

  const reload = () => {
    setReloadContext(!reloadContext);
  };

  return (
    <HabitButtonContext.Provider
      value={[habitButtonSettings, setHabitButtonSettings, reload]}>
      {props.children}
    </HabitButtonContext.Provider>
  );
};
