import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const ColorIcon = ({number, borderColor, textColor}) => {
  if (!borderColor) {
    borderColor = 'black';
  }
  if (!textColor) {
    textColor = 'black';
  }

  return (
    <View style={[styles.numberIcon, {borderColor: borderColor}]}>
      <Text style={{color: textColor}}>{number}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  numberIcon: {
    position: 'absolute',
    marginRight: 3,
    marginLeft: 'auto',
    width: 20,
    height: 19,
    borderRadius: 3,
    borderColor: 'black',
    borderWidth: 1.9,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ColorIcon;
