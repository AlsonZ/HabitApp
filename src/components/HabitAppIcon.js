import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Squircle from '../icons/Squircle';
import Tick from '../icons/Tick';
import Cross from '../icons/Cross';

const HabitAppIcon = React.memo(
  ({
    disabled,
    title,
    // description,
    backgroundActiveColor,
    backgroundColor,
    textActiveColor,
    textColor,
    onPress,
    completed,
  }) => {
    const squircleProps = {
      width: '58',
      height: '58',
      viewBox: '-304 -304 608 608',
      //rgba(0,0,0,0.4)
      fill: isActive ? 'lightgray' : 'rgba(0,0,0,0.04)',
    };
    const iconProps = {
      width: '58',
      height: '58',
      viewBox: '0 0 20 20',
      //rgba(0,0,0,0.4)
      fill: isActive ? backgroundActiveColor : backgroundColor,
    };
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
      setIsActive(completed);
    }, [completed]);

    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.touchable}
        disabled={disabled}>
        <View style={styles.button}>
          <View>
            <Squircle style={styles.iconBackground} {...squircleProps} />
            {isActive ? <Tick {...iconProps} /> : <Cross {...iconProps} />}
          </View>
          <View style={{}}>
            <Text
              style={[
                styles.buttonText,
                {color: isActive ? textActiveColor : textColor},
              ]}
              numberOfLines={3}
              textBreakStrategy="highQuality">
              {title}
            </Text>
            {/* {listView && (
            <Text style={listStyles.description}>{description}</Text>
          )} */}
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
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

export default HabitAppIcon;
