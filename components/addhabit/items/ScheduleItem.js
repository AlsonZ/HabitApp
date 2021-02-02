import React, {useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {AddHabitContext} from '../../contexts/AddHabitContext';

const ScheduleItem = ({item, index}) => {
  const [habitDetails, setHabitDetails] = useContext(AddHabitContext);

  return (
    <View>
      <CheckBox
        disable={false}
        value={item.active}
        onValueChange={(val) => {
          console.log(item);
          setHabitDetails((prevState) => {
            const scheduleCopy = prevState.schedule;
            scheduleCopy[index].active = val;

            return {
              ...prevState,
              schedule: scheduleCopy,
            };
          });
        }}
      />
      <Text>{item.day}</Text>
    </View>
  );
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
