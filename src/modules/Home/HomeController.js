import React, {useContext, useState} from 'react';
import HomeScreen from './HomeScreen';
import {LoadedHabitsContext} from '../../contexts/LoadedHabitsContext';

const HomeController = () => {
  const [currentlyLoadedDayTest, setCurrentlyLoadedDayTest] = useState(
    new Date(),
  );
  const [
    loadedHabits,
    updateHabitinContext,
    loadDay,
    currentlyLoadedDay,
    reload,
  ] = useContext(LoadedHabitsContext);
  // const [loadedHabits, setLoadedHabits, currentlyLoadedDay, loadDay] = [
  // const [loadedHabits, setLoadedHabits, currentlyLoadedDay, loadDay] = [
  //   [
  //     {
  //       id: 1,
  //       name: 'test1',
  //       completed: false,
  //       colors: {
  //         textActiveColor: 'red',
  //         textColor: 'black',
  //         backgroundColor: 'gray',
  //         backgroundActiveColor: 'green',
  //       },
  //     },
  //     {
  //       id: 2,
  //       name: 'test2',
  //       completed: false,
  //       colors: {
  //         textActiveColor: 'red',
  //         textColor: 'black',
  //         backgroundColor: 'gray',
  //         backgroundActiveColor: 'green',
  //       },
  //     },
  //   ],
  //   () => {},
  //   currentlyLoadedDayTest,
  //   (date) => {
  //     setCurrentlyLoadedDayTest(date);
  //   },
  // ];

  const updateHabit = (item) => {
    console.log(item);
  };

  return (
    <HomeScreen
      loadedHabits={loadedHabits}
      currentlyLoadedDay={currentlyLoadedDay}
      loadDay={loadDay}
      updateHabit={updateHabit}
    />
  );
};

export default HomeController;
