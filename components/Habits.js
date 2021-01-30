import React, {useContext} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import HabitButton from './HabitButton';
import {DefaultColors as Colors} from './settings/Colors';
import {HabitListContext} from './contexts/HabitListContext';
import ColorIcon from './icons/ColorIcon';

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
        <View style={styles.top}>
          <ColorIcon style={styles.icon} />
          <ColorIcon style={styles.icon} />
          <ColorIcon style={styles.icon} />
          <ColorIcon style={styles.icon} />
          <ColorIcon style={styles.icon} />
          <ColorIcon style={styles.icon} />
          <ColorIcon style={styles.icon} />
        </View>
        <View style={styles.bottom}>
          <ColorIcon style={styles.icon} activeColor={'blue'} />
          <ColorIcon style={styles.icon} activeColor={'blue'} />
          <ColorIcon style={styles.icon} activeColor={'blue'} />
          <ColorIcon style={styles.icon} activeColor={'blue'} />
          <ColorIcon style={styles.icon} activeColor={'blue'} />
          <ColorIcon style={styles.icon} activeColor={'blue'} />
          <ColorIcon style={styles.icon} activeColor={'blue'} />
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
    backgroundColor: 'lightgreen',
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
  icon: {
    width: 30,
    height: 30,
    margin: 10,
  },
});

export default Habits;
