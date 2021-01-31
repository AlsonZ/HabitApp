import React, {useContext} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import HabitButton from './HabitButton';
import {DefaultColors as Colors} from './settings/Colors';
import {HabitListContext} from './contexts/HabitListContext';
import DayIcon from './icons/DayIcon';

const Habits = () => {
  const [habitList, setHabitList] = useContext(HabitListContext);

  const loadHabits = (section) => {
    if (habitList) {
      let indents = [];
      const habitsToLoad = 4;
      const startHabitIndex = section == 'top' ? 0 : 4;
      const maxLoaded = startHabitIndex + habitsToLoad;
      const maximumLoadedHabits =
        habitList.length > maxLoaded ? maxLoaded : habitList.length;
      for (let i = startHabitIndex; i < maximumLoadedHabits; i++) {
        indents.push(
          <HabitButton
            key={i + habitList[i].name}
            title={habitList[i].name}
            textColor={habitList[i].colors.textColor}
            backgroundColor={habitList[i].colors.backgroundColor} // add styling to make this auto transparent and not dependent on the rgba here
            textActiveColor={habitList[i].colors.textActiveColor}
            backgroundActiveColor={habitList[i].colors.backgroundActiveColor}
            onPress={() => {
              console.log(`Pressed ${habitList[i].name}`);
            }}></HabitButton>,
        );
      }
      // return indents;
      return <View style={[styles[section]]}>{indents}</View>;
    }
    // else return "create a new Habit now + navigation link to add habit screen"
  };
  return (
    <View style={styles.container}>
      {loadHabits('top')}
      {loadHabits('bottom')}
      <View style={styles.days}>
        <Text style={styles.dayTitle}>Day</Text>
        <View style={styles.top}>
          <DayIcon style={styles.icon} number={1} textStyle={styles.iconText} />
          <DayIcon style={styles.icon} number={2} textStyle={styles.iconText} />
          <DayIcon style={styles.icon} number={3} textStyle={styles.iconText} />
          <DayIcon style={styles.icon} number={4} textStyle={styles.iconText} />
          <DayIcon style={styles.icon} number={5} textStyle={styles.iconText} />
          <DayIcon style={styles.icon} number={6} textStyle={styles.iconText} />
          <DayIcon style={styles.icon} number={7} textStyle={styles.iconText} />
        </View>
        <View style={styles.bottom}>
          <DayIcon style={styles.icon} number={8} textStyle={styles.iconText} />
          <DayIcon style={styles.icon} number={9} textStyle={styles.iconText} />
          <DayIcon
            style={styles.icon}
            number={10}
            textStyle={styles.iconText}
          />
          <DayIcon
            style={styles.icon}
            number={11}
            textStyle={styles.iconText}
          />
          <DayIcon
            style={styles.icon}
            number={12}
            textStyle={styles.iconText}
          />
          <DayIcon
            style={styles.icon}
            number={13}
            textStyle={styles.iconText}
          />
          <DayIcon
            style={styles.icon}
            number={14}
            textStyle={styles.iconText}
          />
        </View>
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
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 'auto',
  },
  bottom: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  days: {
    display: 'flex',
    flexDirection: 'column',
    // flexWrap: 'wrap',
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
