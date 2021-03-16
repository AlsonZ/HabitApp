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
import ScrollPicker from './ScrollPicker';

const ScheduleItem = () => {
  // set this to scheduletype from navigation and not default to the config
  const [active, setActive] = useState(config.scheduleType.everyday);
  const durationPickerScrollView = useRef(null);
  // const durationItemHeight = 40;
  const durations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedValue, setSelectedValue] = useState(durations[0]);
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
        <Text>{selectedValue}</Text>
      </View>
      {active !== config.scheduleType.everyday && (
        <ScrollPicker
          values={durations}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          width={100}
          itemHeight={60}
          // fontSize={20}
        />
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
