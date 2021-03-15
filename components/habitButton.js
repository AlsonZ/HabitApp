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
  const [isActive, setIsActive] = useState(false);

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
  useEffect(() => {
    setIsActive(completed);
  }, [completed]);

  return (
    <TouchableOpacity
      onPress={buttonPress}
      style={listView ? listStyles.touchable : appStyles.touchable}
      disabled={disabled}>
      <View style={[listView ? listStyles.button : appStyles.button]}>
        <View>
          <IconBackgroundSvg
            style={appStyles.iconBackground}
            {...iconBackgroundSvgProps}
          />
          {isActive ? <TickSvg {...appSvgProps} /> : <XSvg {...appSvgProps} />}
        </View>
        <View style={listView ? listStyles.textContainer : {}}>
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
            <Text style={listStyles.description}>{description}</Text>
          )}
        </View>
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
    flexDirection: 'row-reverse',
    position: 'relative',
  },
  description: {
    color: 'gray',
    fontSize: 10,
  },
  textContainer: {
    flexGrow: 1,
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
