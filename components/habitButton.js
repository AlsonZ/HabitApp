import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import XSvg from './svgs/XSvg';
import TickSvg from './svgs/TickSvg';
import IconBackgroundSvg from './svgs/IconBackgroundSvg';

const HabitButton = ({
  disabled,
  title,
  textColor,
  backgroundColor,
  textActiveColor,
  backgroundActiveColor,
  onPress,
  completed,
  listView,
}) => {
  const [isActive, setIsActive] = useState(completed ? completed : false);

  const iconBackgroundSvgProps = {
    width: '58',
    height: '58',
    viewBox: '-304 -304 608 608',
    //rgba(0,0,0,0.4)
    fill: isActive ? 'lightgray' : 'rgba(0,0,0,0.04)',
  };
  const appSvgProps = {
    width: '58',
    height: '58',
    viewBox: '0 0 20 20',
    //rgba(0,0,0,0.4)
    fill: isActive ? backgroundActiveColor : backgroundColor,
  };
  const listSvgProps = {
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
    <TouchableOpacity
      onPress={buttonPress}
      style={listView ? listStyles.touchable : appStyles.touchable}
      disabled={disabled}>
      <View
        style={[
          listView ? listStyles.button : appStyles.button,
          // {backgroundColor: isActive ? backgroundActiveColor : backgroundColor},
        ]}>
        <View style={listView ? listStyles.iconPadding : appStyles.iconPadding}>
          <IconBackgroundSvg
            style={appStyles.iconBackground}
            {...iconBackgroundSvgProps}
          />
          {isActive ? <TickSvg {...appSvgProps} /> : <XSvg {...appSvgProps} />}
        </View>
        <Text
          style={[
            appStyles.buttonText,
            {color: isActive ? textActiveColor : textColor},
          ]}
          numberOfLines={3}
          textBreakStrategy="highQuality">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const listStyles = StyleSheet.create({
  touchable: {
    flex: 1,
    // backgroundColor: 'red',
  },
  button: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  iconPadding: {},
});

const appStyles = StyleSheet.create({
  touchable: {
    width: 64,
    maxHeight: 95,
    margin: 10,
    borderRadius: 8,
    display: 'flex',
  },
  iconPadding: {
    position: 'relative',
  },
  iconBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  button: {
    paddingVertical: 14,
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
