import React, {useContext, useState} from 'react';
import HomeScreen from './HomeScreen';
import {LoadedHabitsContext} from '../../contexts/LoadedHabitsContext';

const HomeController = () => {
  const [currentlyLoadedDayTest, setCurrentlyLoadedDayTest] = useState(
    new Date(),
  );
  const [
    loadedHabits,
    updateHabit,
    loadDay,
    currentlyLoadedDay,
    reload,
  ] = useContext(LoadedHabitsContext);

  // const updateHabit = (item) => {
  //   console.log(item);
  // };

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
