import React, {useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import {AddHabitContext} from '../../contexts/AddHabitContext';

const ScheduleItem = ({navigation}) => {
  const scheduleItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const [habitDetails, setHabitDetails] = useContext(AddHabitContext);

  const ScheduleListItem = ({day}) => {
    const dayText = day == 1 ? 'day' : 'days';

    const setSchedule = () => {
      setHabitDetails({...habitDetails, schedule: day});
      navigation.navigate('Main');
    };

    return (
      <TouchableOpacity style={styles.listItem} onPress={setSchedule}>
        <FontistoIcon
          style={styles.habitIcon}
          name="date"
          color={'black'}
          size={24}
        />
        <Text>
          {day} {dayText}
        </Text>
      </TouchableOpacity>
    );
  };
  const loadScheduleList = () =>
    scheduleItems.map((day, index) => (
      <ScheduleListItem day={day} key={index} />
    ));

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
    marginRight: 16,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  habitIcon: {
    width: 35,
    height: 25,
  },
});

export default ScheduleItem;
