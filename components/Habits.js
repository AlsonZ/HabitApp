import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import HabitButton from './HabitButton';
import Colors from './settings/Colors';

const Habits = () => {
  const press = () => {};
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
