import React, {createContext, useEffect, useState} from 'react';
import {getCurrentTheme, storeCurrentTheme} from '../storage/Storage';

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState({
    bottomNavBarColor: 'black',
    topNavBarColor: 'black',
    highlightColor: 'lightBlue',
    textColor: 'black',
  });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    let loading = false;
    const getData = async () => {
      loading = true;
      const currentTheme = await getCurrentTheme();
      setCategories(currentTheme);
      loading = false;
    };
    if (!loading) {
      getData();
    }
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
