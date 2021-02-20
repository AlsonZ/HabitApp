import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, Text, Button} from 'react-native';
import HabitButton from './HabitButton';
import {DefaultColors as Colors} from './settings/Colors';
import {HabitListContext} from './contexts/HabitListContext';
import DayIcon from './icons/DayIcon';
import {deleteAllPastHabitData} from './settings/Storage';

const Habits = () => {
  const [habitList, setHabitList, passedDays] = useContext(HabitListContext);
  const [currentlyViewingDay, setCurrentlyViewingDay] = useState(1);
  const [currentlyLoadedHabits, setCurrentlyLoadedHabits] = useState(
    <View style={styles.container}></View>,
  );
  const [scheduleIcons, setScheduleIcons] = useState([]);
  const loadHabits = (day) => {
    const index = day - 1;
    const loadingHabitList = habitList[index];
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
    setCurrentlyViewingDay(day);
  };
  useEffect(() => {
    console.log('Passed Days: ' + passedDays);
    setCurrentlyViewingDay(passedDays + 1);
  }, [passedDays]);

  useEffect(() => {
    const generateScheduleIcons = () => {
      let data = [];
      for (let day = 1; day <= 14; day++) {
        data.push({
          number: day,
          activeColor: 'red',
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
        renderItem={({item, index}) => (
          <DayIcon
            index={index}
            number={item.number}
            activeColor={item.activeColor}
            textStyle={styles.iconText}
            style={styles.icon}
            isCurrentDay={index === passedDays ? true : false} // where index is day -1
            currentlyViewingDay={currentlyViewingDay}
            onPress={() => {
              const day = index + 1;
              loadHabits(day);
            }}
          />
        )}
        keyExtractor={(item) => `${item.number}`}
        extraData={[currentlyViewingDay, scheduleIcons]}
      />
    );
  };
  return (
    <View style={styles.container}>
      {currentlyLoadedHabits}
      <View style={styles.days}>
        <Button
          title="delete"
          onPress={async () => {
            await deleteAllPastHabitData();
          }}></Button>
        <Button
          title="test"
          onPress={() => {
            habitList.forEach((habit, index) => {
              console.log(index + habit);
              console.log(habit);
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
