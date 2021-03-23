import React, {createContext, useEffect, useState} from 'react';
import {getTheme} from '../storage/Storage';

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const initialTheme = {
    navStatusBarColor: 'black',
    navStatusBarTextColor: 'dark-content',
    navTopBarColor: 'black',
    navTopBarTextColor: 'white',
    navBottomBarColor: 'black',
    highlightColor: 'lightBlue',
    textColor: 'black',
    backgroundColor: 'black',
    borderColor: 'red',
    iconColor: 'white',
  };
  const [theme, setTheme] = useState(initialTheme);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const currentTheme = await getTheme();
      if (Object.keys(currentTheme).length > 0) {
        let themeCopy = Object.assign({}, theme);
        for (let color in themeCopy) {
          if (
            currentTheme.hasOwnProperty(color) &&
            currentTheme[color] !== undefined
          ) {
            console.log(themeCopy[color]);
            themeCopy[color] = currentTheme[color];
          }
        }
        setTheme(themeCopy);
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
