import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {DefaultColors} from '../settings/Colors';
import {config} from '../config/config';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ScheduleItem = () => {
  // set this to scheduletype from navigation and not default to the config
  const [active, setActive] = useState(config.scheduleType.everyday);
  const [currentlyChosen, setCurrentlyChosen] = useState(0);
  const durationPickerScrollView = useRef(null);
  const durationItemHeight = 40;
  const durations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const onPress = (val) => {
    // setHabitDetails((prevState) => {
    //   const scheduleCopy = prevState.schedule;
    //   scheduleCopy[index].active = val;
    //   return {
    //     ...prevState,
    //     schedule: scheduleCopy,
    //   };
    // });
  };

  const ScheduleButton = ({scheduleType}) => {
    return (
      <TouchableHighlight
        underlayColor={DefaultColors.touchableHightlightUnderlay}
        onPress={() => {
          setActive(scheduleType);
        }}>
        <View style={styles.container}>
          <CheckBox
            disable={false}
            value={scheduleType === active}
            onChange={() => {
              setActive(scheduleType);
            }}
          />
          <Text style={styles.checkBoxText}>{scheduleType.name}</Text>
        </View>
      </TouchableHighlight>
    );
  };
  const DurationItem = ({text, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCurrentlyChosen(durations[index]);
          durationPickerScrollView.current.scrollTo({
            y: index * durationItemHeight,
            animated: true,
          });
        }}
        style={{height: durationItemHeight}}>
        <Text
          style={{
            borderColor: 'black',
            borderWidth: 1,
            textAlign: 'center',
            fontSize: 20,
            height: durationItemHeight,
            lineHeight: durationItemHeight - durationItemHeight / 8,
          }}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View>
        {Object.keys(config.scheduleType).map((key) => {
          return (
            <ScheduleButton
              key={config.scheduleType[key].name}
              scheduleType={config.scheduleType[key]}
            />
          );
        })}
      </View>
      <View>
        <Text>{currentlyChosen}</Text>
      </View>
      {active !== config.scheduleType.everyday && (
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: durationItemHeight * 3,
            width: 100,
            marginTop: durationItemHeight,
            backgroundColor: 'red',
          }}>
          <View
            style={{
              position: 'absolute',
              height: durationItemHeight,
              backgroundColor: 'rgba(255,1,1,0.5)',
              width: '100%',
              top: durationItemHeight,
              borderRadius: 10,
            }}
          />
          <ScrollView
            ref={durationPickerScrollView}
            snapToInterval={durationItemHeight}
            showsVerticalScrollIndicator={false}
            style={{
              width: '100%',
              paddingTop: durationItemHeight,
            }}>
            {durations.map((duration, index) => (
              <DurationItem
                key={duration + index}
                text={duration}
                index={index}
              />
            ))}
            <View style={{height: durationItemHeight * 2}}></View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    margin: 2,
    marginBottom: 0,
    marginLeft: 20,
  },
  checkBoxText: {
    fontSize: 15,
    width: '100%',
  },
});

export default ScheduleItem;
