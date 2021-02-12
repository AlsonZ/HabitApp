import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, Text, Button} from 'react-native';
import HabitButton from './HabitButton';
import {DefaultColors as Colors} from './settings/Colors';
import {HabitListContext} from './contexts/HabitListContext';
import DayIcon from './icons/DayIcon';

const Habits = () => {
  const [habitList, setHabitList] = useContext(HabitListContext);
  const [currentlyLoadedHabits, setCurrentlyLoadedHabits] = useState(
    <View style={styles.container}></View>,
  );
  const [scheduleIcons, setScheduleIcons] = useState([]);
  const loadHabits = (index) => {
    const day = index - 1;
    const loadingHabitList = habitList[day];
    let indents = [];
    for (let i = 0; i < loadingHabitList.length; i++) {
      indents.push(
        <HabitButton
          key={loadingHabitList[i].name + i}
          title={loadingHabitList[i].name}
          textColor={loadingHabitList[i].colors.textColor}
          backgroundColor={loadingHabitList[i].colors.backgroundColor} // add styling to make this auto transparent and not dependent on the rgba here
          textActiveColor={loadingHabitList[i].colors.textActiveColor}
          backgroundActiveColor={
            loadingHabitList[i].colors.backgroundActiveColor
          }
          onPress={() => {
            console.log(`Pressed ${loadingHabitList[i].name}`);
          }}></HabitButton>,
      );
    }
    setCurrentlyLoadedHabits(
      <View style={styles.habitContainer}>{indents}</View>,
    );
  };
  useEffect(() => {
    console.log('runs useEffect');
    const generateScheduleIcons = () => {
      let data = [];
      for (let i = 1; i <= 14; i++) {
        data.push({
          number: i,
          textStyle: styles.iconText,
          style: styles.icon,
          onPress: () => {
            loadHabits(i);
          },
        });
      }
      return data;
    };
    setScheduleIcons(generateScheduleIcons());
  }, [habitList]);
  const loadDayIcons = () => {
    return (
      <FlatList
        contentContainerStyle={styles.listContainer}
        numColumns={7}
        data={scheduleIcons}
        renderItem={(props) => <DayIcon {...props} />}
        keyExtractor={(item) => `${item.number}`}
        extraData={scheduleIcons}
      />
    );
  };
  return (
    <View style={styles.container}>
      {currentlyLoadedHabits}
      <View style={styles.days}>
        <Button
          title="test"
          onPress={() => {
            habitList.forEach((habit, index) => {
              console.log(index + habit);
            });
          }}></Button>
        <Text style={styles.dayTitle}>Schedule</Text>
        {loadDayIcons()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  listContainer: {
    alignItems: 'center',
  },
  habitContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  days: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  dayTitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  icon: {
    width: 30,
    height: 30,
    margin: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  },
  iconText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Habits;
