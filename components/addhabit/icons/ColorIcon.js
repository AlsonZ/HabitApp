import React from 'react';
import {View, StyleSheet} from 'react-native';
const ColorIcon = ({activeColor, borderColor, style}) => {
  return (
    <View
      style={[
        styles.colorIcon,
        {
          backgroundColor: activeColor,
          borderColor: borderColor,
        },
        style,
      ]}></View>
  );
};

const styles = StyleSheet.create({
  colorIcon: {
    width: 20,
    height: 19,
    borderRadius: 3,
    borderWidth: 1.9,
  },
});

export default ColorIcon;
