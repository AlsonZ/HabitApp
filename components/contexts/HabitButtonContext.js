import React, {createContext, useEffect, useState} from 'react';
import {Colors} from '../settings/Colors';
import {getHabitButtonSettings} from '../settings/Storage';

export const HabitButtonContext = createContext();

export const HabitButtonProvider = (props) => {
  const [habitButtonSettings, setHabitButtonSettings] = useState({
    habitButtonView: 'list', // or app
    colors: {
      textColor: Colors.gray,
      backgroundColor: Colors.transparent,
      textActiveColor: 'black',
      backgroundActiveColor: Colors.white,
    },
  });
  const [reloadContext, setReloadContext] = useState(false);

  useEffect(() => {
    let loading = false;
    const getData = async () => {
      loading = true;
      // const settings = await getHabitButtonSettings();
      // setHabitButtonSettings(settings);
      loading = false;
    };
    if (!loading) {
      getData();
    }
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
