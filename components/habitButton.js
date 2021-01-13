import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import XSvg from './svgs/XSvg';
import TickSvg from './svgs/TickSvg';

const HabitButton = ({title, textColor, backgroundColor, onPress}) => {
  const [isActive, setIsActive] = useState(false);

  const svgProps = {
    width: '30',
    height: '30',
    viewBox: '0 0 20 20',
    //rgba(0,0,0,0.4)
    fill: isActive ? textColor : 'gray',
  };

  const buttonPress = () => {
    setIsActive(!isActive);
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity onPress={buttonPress}>
      <View
        style={[
          styles.button,
          {backgroundColor: isActive ? backgroundColor : 'rgba(0,0,0,0.1)'},
        ]}>
        {isActive ? <TickSvg {...svgProps} /> : <XSvg {...svgProps} />}
        <Text
          style={[styles.buttonText, {color: isActive ? textColor : 'gray'}]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 8,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default HabitButton;
