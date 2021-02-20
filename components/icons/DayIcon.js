import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
const DayIcon = ({
  index,
  number,
  activeColor,
  textStyle,
  style,
  isCurrentDay,
  currentlyViewingDay,
  onPress,
}) => {
  const [border, setBorder] = useState('');

  const backgroundColor = isCurrentDay ? activeColor : style.backgroundColor;

  useEffect(() => {
    // where index === day -1
    if (index === currentlyViewingDay - 1) {
      setBorder(styles.border);
    } else {
      setBorder('');
    }
  }, [currentlyViewingDay]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.icon, style, {backgroundColor: backgroundColor}, border]}>
      <Text style={textStyle}>{number}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 19,
    // backgroundColor: 'red',
    borderRadius: 3,
  },
  border: {
    borderColor: 'black',
    borderWidth: 1.9,
  },
});

export default DayIcon;
