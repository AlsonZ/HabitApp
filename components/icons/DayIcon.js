import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
const DayIcon = ({item, index}) => {
  if (!item.borderColor) {
    item.borderColor = 'black';
  }
  if (!item.textColor) {
    item.textColor = 'black';
  }

  return (
    <TouchableOpacity
      onPress={item.onPress}
      style={[
        styles.icon,
        {borderColor: item.borderColor, backgroundColor: item.backgroundColor},
        item.style,
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
    // borderRadius: 3,
    // borderColor: 'black',
    // borderWidth: 1.9,
  },
});

export default DayIcon;
