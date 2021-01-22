import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

const Schedule = () => {
  const scheduleItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const ScheduleListItem = ({day}) => {
    const dayText = day == 1 ? 'day' : 'days';

    return (
      <View style={styles.listItem}>
        <FontistoIcon
          style={styles.habitIcon}
          name="date"
          color={'black'}
          size={24}
        />
        <Text>
          {day} {dayText}
        </Text>
      </View>
    );
  };
  const loadScheduleList = () =>
    scheduleItems.map((day) => <ScheduleListItem day={day} />);

  return <ScrollView style={styles.container}>{loadScheduleList()}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    margin: 17,
    marginRight: 1,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    marginBottom: 6,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  habitIcon: {
    width: 35,
    height: 25,
  },
});

export default Schedule;
