import React, {createContext, useEffect, useState} from 'react';

export const HabitListContext = createContext();

export const HabitListProvider = (props) => {
  const [habitList, setHabitList] = useState([]);

  return (
    <HabitListContext.Provider value={[habitList, setHabitList]}>
      {props.children}
    </HabitListContext.Provider>
  );
};
