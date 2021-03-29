import React, {useState} from 'react';
import HomeScreen from './HomeScreen';

const HomeController = () => {
  const [currentlyLoadedDayTest, setCurrentlyLoadedDayTest] = useState(
    new Date(),
  );
  // const [loadedHabits, setLoadedHabits, currentlyLoadedDay] = useContext();
  // const [loadedHabits, setLoadedHabits, currentlyLoadedDay, loadDay] = [
  const [loadedHabits, setLoadedHabits, currentlyLoadedDay, loadDay] = [
    [
      {id: 1, name: 'test1'},
      {id: 2, name: 'test2'},
    ],
    () => {},
    currentlyLoadedDayTest,
    (date) => {
      setCurrentlyLoadedDayTest(date);
    },
  ];

  return (
    <HomeScreen
      loadedHabits={loadedHabits}
      currentlyLoadedDay={currentlyLoadedDay}
      loadDay={loadDay}
    />
  );
};

export default HomeController;
