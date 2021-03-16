import React, {useEffect, useState, useRef} from 'react';
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
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import ScrollPicker from './ScrollPicker';

const ScheduleItem = () => {
  // set this to scheduletype from navigation and not default to the config
  const [active, setActive] = useState(config.scheduleType.everyday);
  const durationAmount = [...Array(365)].map((_, index) => index + 1);
  const durationType = ['days', 'weeks', 'months', 'years'];
  const [
    selectedDurationAmountIndex,
    setSelectedDurationAmountIndex,
  ] = useState(0);
  const [
    userSelectedDurationAmountIndex,
    setUserSelectedDurationAmountIndex,
  ] = useState(0);
  const [
    userSelectedDurationTypeIndex,
    setUserSelectedDurationTypeIndex,
  ] = useState(0);
  const [selectedDurationTypeIndex, setSelectedDurationTypeIndex] = useState(0);
  const onPress = (val) => {};

  useEffect(() => {
    console.log(
      'Selected Values:',
      durationAmount[selectedDurationAmountIndex],
      durationType[selectedDurationTypeIndex],
    );
  }, [selectedDurationAmountIndex, selectedDurationTypeIndex]);

  const ScheduleButton = ({scheduleType}) => {
    return (
      <TouchableHighlight
        underlayColor={DefaultColors.touchableHightlightUnderlay}
        onPress={() => {
          setActive(scheduleType);
          switch (scheduleType.name) {
            case 'weekly':
              setSelectedDurationAmountIndex(scheduleType.duration.weeks - 1);
              setUserSelectedDurationAmountIndex(
                scheduleType.duration.weeks - 1,
              );
              setSelectedDurationTypeIndex(1);
              setUserSelectedDurationTypeIndex(1);
              break;
            case 'fortnightly':
              setSelectedDurationAmountIndex(scheduleType.duration.weeks - 1);
              setUserSelectedDurationAmountIndex(
                scheduleType.duration.weeks - 1,
              );
              setSelectedDurationTypeIndex(1);
              setUserSelectedDurationTypeIndex(1);
              break;
            case 'monthly':
              setSelectedDurationAmountIndex(scheduleType.duration.months - 1);
              setUserSelectedDurationAmountIndex(
                scheduleType.duration.months - 1,
              );
              setSelectedDurationTypeIndex(2);
              setUserSelectedDurationTypeIndex(2);
              break;
            case 'yearly':
              setSelectedDurationAmountIndex(scheduleType.duration.years - 1);
              setUserSelectedDurationAmountIndex(
                scheduleType.duration.years - 1,
              );
              setSelectedDurationTypeIndex(3);
              setUserSelectedDurationTypeIndex(3);
              break;
            case 'custom':
              setSelectedDurationAmountIndex(scheduleType.duration.days - 1);
              setUserSelectedDurationTypeIndex(scheduleType.duration.days - 1);
              setSelectedDurationTypeIndex(0);
              setUserSelectedDurationAmountIndex(0);
              break;
          }
          // console.log(
          //   scheduleType,
          //   scheduleType.name,
          //   selectedDurationTypeIndex,
          // );
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
    <ScrollView>
      <ScrollView horizontal contentContainerStyle={{width: '100%'}}>
        <FlatList
          data={Object.keys(config.scheduleType)}
          renderItem={({item}) => (
            <ScheduleButton
              key={config.scheduleType[item].name}
              scheduleType={config.scheduleType[item]}
            />
          )}
          keyExtractor={(key) => key}
        />
      </ScrollView>
      {active !== config.scheduleType.everyday && (
        <Text style={styles.pickerTitle}>Duration</Text>
      )}
      <ScrollView horizontal contentContainerStyle={styles.pickerContainer}>
        {active !== config.scheduleType.everyday && (
          <>
            <ScrollPicker
              values={durationAmount}
              selectedValueIndex={selectedDurationAmountIndex}
              setSelectedValueIndex={setSelectedDurationAmountIndex}
              width={80}
              itemHeight={60}
              userSelectedIndex={userSelectedDurationAmountIndex}
            />
            <ScrollPicker
              values={durationType}
              selectedValueIndex={selectedDurationTypeIndex}
              setSelectedValueIndex={setSelectedDurationTypeIndex}
              width={100}
              itemHeight={60}
              userSelectedIndex={userSelectedDurationTypeIndex}
            />
          </>
        )}
      </ScrollView>
    </ScrollView>
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
  pickerTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 5,
  },
  pickerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default ScheduleItem;
