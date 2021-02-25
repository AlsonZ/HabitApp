import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {DefaultColors} from '../settings/Colors';

const ScheduleItem = ({day, active, habitDetails, setHabitDetails, index}) => {
  const onPress = (val) => {
    setHabitDetails((prevState) => {
      const scheduleCopy = prevState.schedule;
      scheduleCopy[index].active = val;

      return {
        ...prevState,
        schedule: scheduleCopy,
      };
    });
  };

  return (
    <TouchableHighlight
      underlayColor={DefaultColors.touchableHightlightUnderlay}
      onPress={() => {
        onPress(!active);
      }}>
      <View style={styles.container}>
        <CheckBox
          disable={false}
          value={active}
          onValueChange={(val) => {
            onPress(val);
          }}
        />
        <Text style={styles.checkBoxText}>Day {day}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    margin: 2,
    marginLeft: 20,
  },
  checkBoxText: {
    fontSize: 15,
    width: '100%',
  },
});

export default ScheduleItem;
