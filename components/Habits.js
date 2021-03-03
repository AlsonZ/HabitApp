import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
} from 'react-native';
import HabitButton from './HabitButton';
import {DefaultColors as Colors} from './settings/Colors';
import {HabitListContext} from './contexts/HabitListContext';
import DayIcon from './icons/DayIcon';
import {
  deleteAllPastHabitData,
  deleteAllScheduledHabits,
} from './settings/Storage';

const Habits = () => {
  const [habitList, setHabitList, passedDays] = useContext(HabitListContext);
  const [currentlyViewingDay, setCurrentlyViewingDay] = useState(1);
  const [currentlyLoadedHabits, setCurrentlyLoadedHabits] = useState(
    <View style={styles.container}></View>,
  );
  const [scheduleIcons, setScheduleIcons] = useState([]);
  const [habitInnerContainerWidth, setHabitInnerContainerWidth] = useState(
    null,
  );
  const [currentlyActiveScreen, setCurrentlyActiveScreen] = useState(0);

  const loadHabits = (day) => {
    const index = day - 1;
    const loadingHabitList = JSON.parse(JSON.stringify(habitList[index]));
    let indents = [];
    if (loadingHabitList) {
      for (let i = 0; i < loadingHabitList.length; i++) {
        indents.push(
          <HabitButton
            key={loadingHabitList[i].name + i + index}
            disabled={day > passedDays + 1 ? true : false}
            title={loadingHabitList[i].name}
            textColor={loadingHabitList[i].colors.textColor}
            backgroundColor={loadingHabitList[i].colors.backgroundColor} // add styling to make this auto transparent and not dependent on the rgba here
            textActiveColor={loadingHabitList[i].colors.textActiveColor}
            backgroundActiveColor={
              loadingHabitList[i].colors.backgroundActiveColor
            }
            completed={loadingHabitList[i].completed}
            onPress={() => {
              loadingHabitList[i].completed = !loadingHabitList[i].completed;
              // clone habitlist and replace index with deep cloned index item
              const habitListClone = [...habitList];
              // console.log(habitList)
              habitListClone[index] = loadingHabitList;
              // update habits list
              setHabitList(habitListClone);
            }}></HabitButton>,
        );
      }
    }
    setCurrentlyLoadedHabits(indents);
    setCurrentlyViewingDay(day);
    setCurrentlyActiveScreen(day);
  };

  const calculateWidth = (e) => {
    const habitButtonTotalWidth = 84;
    const newWidth = parseInt(
      e.nativeEvent.layout.width / habitButtonTotalWidth,
    );
    const newContainerWidth = newWidth * habitButtonTotalWidth;
    console.log('native width: ' + e.nativeEvent.layout.width);
    console.log('newWidth: ' + newContainerWidth);
    setHabitInnerContainerWidth(newContainerWidth);
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
          activeColor: 'lightblue',
        });
      }
      return data;
    };
    setScheduleIcons(generateScheduleIcons());
    let loading = false;
    if (habitList.length > 0 && habitList[0] !== null) {
      if (!loading) {
        loading = true;
        if (currentlyActiveScreen !== 0) {
          loadHabits(currentlyActiveScreen);
        } else {
          loadHabits(passedDays + 1);
        }
        loading = false;
      }
    }
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
      <View style={styles.habitOuterContainer} onLayout={calculateWidth}>
        <ScrollView
          contentContainerStyle={[
            styles.habitContainer,
            {width: habitInnerContainerWidth},
          ]}>
          {currentlyLoadedHabits}
        </ScrollView>
      </View>
      <View style={styles.days}>
        <Button
          title="delete"
          onPress={async () => {
            await deleteAllPastHabitData();
          }}></Button>
        <Button
          title="test"
          onPress={async () => {
            // console.log(habitList[passedDays][7]);
            await deleteAllScheduledHabits();
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
    padding: 10,
  },
  listContainer: {
    alignItems: 'center',
  },
  habitOuterContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  habitContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
