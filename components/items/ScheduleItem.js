import React, {useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {AddHabitContext} from '../contexts/AddHabitContext';
import {DefaultColors} from '../settings/Colors';

const ScheduleItem = ({item, index}) => {
  const [habitDetails, setHabitDetails] = useContext(AddHabitContext);

  const onPress = (val) => {
    setHabitDetails((prevState) => {
      const scheduleCopy = prevState.schedule;
      scheduleCopy[index].active = val;

      return {
        ...prevState,
        schedule: scheduleCopy,
      };
    });
  };

  return (
    <TouchableHighlight
      underlayColor={DefaultColors.touchableHightlightUnderlay}
      onPress={() => {
        onPress(!item.active);
      }}>
      <View style={styles.container}>
        <CheckBox
          disable={false}
          value={item.active}
          onValueChange={(val) => {
            onPress(val);
          }}
        />
        <Text style={styles.checkBoxText}>Day {item.day}</Text>
      </View>
    </TouchableHighlight>
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
    marginLeft: 20,
  },
  checkBoxText: {
    fontSize: 15,
    width: '100%',
  },
});

export default ScheduleItem;
