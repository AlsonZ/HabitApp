import React, {createContext, useEffect, useState} from 'react';
import {getTheme} from '../storage/Storage';

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState({
    navTopBarColor: 'black',
    navStatusBarColor: 'black',
    navBottomBarColor: 'black',
    highlightColor: 'lightBlue',
    textColor: 'black',
    borderColor: 'red',
  });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const currentTheme = await getTheme();
      if (Object.keys(currentTheme).length > 0) {
        setTheme(currentTheme);
      }
    };

    getData();
  }, [reload]);

  const reloadContext = () => {
    setReload(!reload);
  };

  return (
    <ThemeContext.Provider value={[theme, setTheme, reloadContext]}>
      {props.children}
    </ThemeContext.Provider>
  );
};
