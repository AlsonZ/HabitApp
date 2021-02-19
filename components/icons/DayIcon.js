import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
const DayIcon = ({item, index}) => {
  if (!item.borderColor) {
    item.borderColor = 'black';
  }
  if (!item.textColor) {
    item.textColor = 'black';
  }
  const backgroundColor = item.currentDay
    ? item.activeColor
    : item.style.backgroundColor;

  return (
    <TouchableOpacity
      onPress={item.onPress}
      style={[
        styles.icon,
        item.style,
        {borderColor: item.borderColor, backgroundColor: backgroundColor},
      ]}>
      <Text style={({color: item.textColor}, item.textStyle)}>
        {item.number}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 19,
    // backgroundColor: 'red',
    borderRadius: 3,
    borderColor: 'black',
    borderWidth: 1.9,
  },
});

export default DayIcon;
