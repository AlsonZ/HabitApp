import React, {createContext, useEffect, useState} from 'react';
import {DefaultColors as Colors} from '../settings/Colors';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {config} from '../config/config';
import {format} from 'date-fns';

export const AddHabitContext = createContext();

export const AddHabitProvider = (props) => {
  const formatDate = (dateObj) => {
    return format(dateObj, 'dd/MM/yyyy');
  };

  const initialHabitDetails = (id, date) => ({
    id: id,
    name: '',
    category: 'Category', // placeholder text
    description: '',
    colors: {
      // default colors here
      textColor: Colors.gray,
      backgroundColor: Colors.transparent,
      textActiveColor: Colors.white,
      backgroundActiveColor: Colors.blue,
    },
    archived: false,
    frequency: 1,
    scheduleType: config.scheduleType.everyday,
    startDate: date, // will be chosen by user
    endDate: null,
    lastOccuranceDate: null,
    // will be startdate by default then changes later,
    // stays current day if loaded until next day,
    // where next day will be > nextoccurdate in which then it will be updated
    nextOccuranceDate: date, // should be editable for user as it might screw up
    completed: false,
    // order: 1,
  });
  const [habitDetails, setHabitDetails] = useState(
    initialHabitDetails(uuidv4()),
  );
  const [reloadContext, setReloadContext] = useState(false);

  useEffect(() => {
    setHabitDetails(initialHabitDetails(uuidv4(), formatDate(new Date())));
  }, [reloadContext]);

  const reload = () => {
    setReloadContext(!reloadContext);
  };

  return (
    <AddHabitContext.Provider value={[habitDetails, setHabitDetails, reload]}>
      {props.children}
    </AddHabitContext.Provider>
  );
};
