import React from 'react';
import {View, StyleSheet} from 'react-native';
const ColorIcon = ({activeColor, borderColor}) => {
  return (
    <View
      style={[
        styles.colorIcon,
        {
          backgroundColor: activeColor,
          borderColor: borderColor,
        },
      ]}></View>
  );
};

const styles = StyleSheet.create({
  colorIcon: {
    position: 'absolute',
    marginRight: 3,
    marginLeft: 'auto',
    width: 20,
    height: 19,
    borderRadius: 3,
    borderWidth: 1.9,
    right: 0,
  },
});

export default ColorIcon;
