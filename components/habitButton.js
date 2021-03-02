import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import XSvg from './svgs/XSvg';
import TickSvg from './svgs/TickSvg';

const HabitButton = ({
  title,
  textColor,
  backgroundColor,
  textActiveColor,
  backgroundActiveColor,
  onPress,
  completed,
}) => {
  const [isActive, setIsActive] = useState(completed ? completed : false);

  const svgProps = {
    width: '30',
    height: '30',
    viewBox: '0 0 20 20',
    //rgba(0,0,0,0.4)
    fill: isActive ? textActiveColor : textColor,
  };

  const buttonPress = () => {
    setIsActive(!isActive);
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity onPress={buttonPress} style={styles.touchable}>
      <View
        style={[
          styles.button,
          {backgroundColor: isActive ? backgroundActiveColor : backgroundColor},
        ]}>
        {isActive ? <TickSvg {...svgProps} /> : <XSvg {...svgProps} />}
        <Text
          style={[
            styles.buttonText,
            {color: isActive ? textActiveColor : textColor},
          ]}
          numberOfLines={3}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: 64,
    maxHeight: 95,
    margin: 10,
    borderRadius: 8,
    display: 'flex',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    width: 60,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default HabitButton;
