import React, {useContext} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import HabitButton from './HabitButton';
import {DefaultColors as Colors} from './settings/Colors';
import {HabitListContext} from './contexts/HabitListContext';

const Habits = () => {
  const [habitList, setHabitList] = useContext(HabitListContext);

  const press = () => {};
  const loadHabits = () => {
    if (habitList) {
      return habitList.map((habit, index) => (
        <HabitButton
          key={index + habit.name}
          title={habit.name}
          textColor={habit.colors.textColor}
          backgroundColor={habit.colors.backgroundColor} // add styling to make this auto transparent and not dependent on the rgba here
          textActiveColor={habit.colors.textActiveColor}
          backgroundActiveColor={habit.colors.backgroundActiveColor}
          onPress={() => {
            console.log(`Pressed ${habit.name}`);
          }}></HabitButton>
      ));
    }
    // else return "create a new Habit now + navigation link to add habit screen"
  };
  return (
    <View>
      <Button title="Test" style={styles.habitButton}></Button>
      <HabitButton
        title="Habit"
        textColor={Colors.gray}
        backgroundColor={Colors.transparent}
        textActiveColor={Colors.white}
        backgroundActiveColor={Colors.blue}
        onPress={press}></HabitButton>
      {loadHabits()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Habits;
