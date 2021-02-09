import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
const DayIcon = ({
  number,
  borderColor,
  textColor,
  backgroundColor,
  style,
  textStyle,
  onPress,
}) => {
  if (!borderColor) {
    borderColor = 'black';
  }
  if (!textColor) {
    textColor = 'black';
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.icon,
        {borderColor: borderColor, backgroundColor: backgroundColor},
        style,
      ]}>
      <Text style={({color: textColor}, textStyle)}>{number}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 19,
    // borderRadius: 3,
    // borderColor: 'black',
    // borderWidth: 1.9,
  },
});

export default DayIcon;
