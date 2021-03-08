import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import XSvg from './svgs/XSvg';
import TickSvg from './svgs/TickSvg';
import IconBackgroundSvg from './svgs/IconBackgroundSvg';

const HabitButton = ({
  disabled,
  title,
  description,
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
    width: listView ? '40' : '58',
    height: listView ? '40' : '58',
    viewBox: '-304 -304 608 608',
    //rgba(0,0,0,0.4)
    fill: isActive ? 'lightgray' : 'rgba(0,0,0,0.04)',
  };
  const appSvgProps = {
    width: listView ? '40' : '58',
    height: listView ? '40' : '58',
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
            listView ? listStyles.buttonText : appStyles.buttonText,
            {color: isActive ? textActiveColor : textColor},
          ]}
          numberOfLines={3}
          textBreakStrategy="highQuality">
          {title}
        </Text>
        {listView && (
          // <View style={listStyles.descriptionContainer}>
          <Text style={listStyles.description}>{description}</Text>
          // </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const listStyles = StyleSheet.create({
  touchable: {
    flex: 1,
    width: '100%',
    paddingVertical: 5,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row-reverse',
    position: 'relative',
  },
  iconPadding: {},
  buttonText: {
    flexGrow: 1,
  },
  description: {
    position: 'absolute',
    right: 5,
    bottom: 0,
    fontSize: 10,
    color: 'gray',
  },
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
