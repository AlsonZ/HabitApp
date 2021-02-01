import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const DayIcon = ({
  number,
  borderColor,
  textColor,
  backgroundColor,
  style,
  textStyle,
}) => {
  if (!borderColor) {
    borderColor = 'black';
  }
  if (!textColor) {
    textColor = 'black';
  }

  return (
    <View
      style={[
        styles.icon,
        {borderColor: borderColor, backgroundColor: backgroundColor},
        style,
      ]}>
      <Text style={({color: textColor}, textStyle)}>{number}</Text>
    </View>
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
