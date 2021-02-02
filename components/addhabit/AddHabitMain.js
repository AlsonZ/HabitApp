import React, {useContext, useState} from 'react';
import {AddHabitContext} from '../contexts/AddHabitContext';
import {HabitListContext} from '../contexts/HabitListContext';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import {DefaultColors as Colors} from '../settings/Colors';
import ModalItem from '../modal/ModalItem';
import ColorIcon from '../icons/ColorIcon';
import NumberIcon from '../icons/NumberIcon';

import AntIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getHabit, storeHabit} from '../settings/Storage';

const AddHabitMain = ({navigation}) => {
  const [habitDetails, setHabitDetails] = useContext(AddHabitContext);
  // const [habitList, setHabitList] = useContext(HabitListContext);
  const [modalVisible, setModalVisible] = useState(false);

  const scheduleListItem = ({item, index}) => {
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

  return (
    <View style={styles.container}>
      <ModalItem modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <FlatList
          data={habitDetails.schedule}
          renderItem={scheduleListItem}
          keyExtractor={(item) => `${item.day}`}
          extraData={habitDetails.schedule.active}
        />
      </ModalItem>
      <View style={styles.habitItem}>
        <MCIcon
          style={styles.habitIcon}
          name="lead-pencil"
          color={'black'}
          size={26}
        />
        <TextInput
          placeholder="Habit Name"
          onChangeText={(text) =>
            setHabitDetails({...habitDetails, name: text})
          }></TextInput>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Category')}
        style={styles.habitItem}>
        <AntIcon
          style={styles.habitIcon}
          name="appstore-o"
          color={'black'}
          size={26}
        />
        <Text style={styles.habitText}>{habitDetails.category}</Text>
        <MCIcon
          style={styles.rightIcon}
          name="code-greater-than"
          color={'black'}
          size={26}
        />
      </TouchableOpacity>
      <View style={styles.habitItem}>
        <AntIcon
          style={styles.habitIcon}
          name="filetext1"
          color={'black'}
          size={24}></AntIcon>
        <TextInput
          placeholder="Description"
          onChangeText={(text) =>
            setHabitDetails({...habitDetails, description: text})
          }></TextInput>
      </View>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={styles.habitItem}>
        <FontistoIcon
          style={styles.habitIcon}
          name="date"
          color={'black'}
          size={24}
        />
        <Text style={styles.habitText}>Schedule</Text>
        <MCIcon
          style={styles.rightIcon}
          name="code-greater-than"
          color={'black'}
          size={26}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('test')}
        style={styles.habitItem}
        disabled={true}>
        <FontistoIcon
          style={styles.habitIcon}
          name="clock"
          color={'gray'}
          size={24}
        />
        <Text style={[styles.habitText, {color: 'gray'}]}>Daily Schedule</Text>
        <NumberIcon
          number={habitDetails.dailySchedule}
          borderColor="gray"
          textColor="gray"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('HabitColorItem')}
        style={styles.habitItem}>
        <IonIcon
          style={styles.habitIcon}
          name="color-palette-outline"
          color={'black'}
          size={24}
        />
        <Text style={styles.habitText}>Colors</Text>
        <ColorIcon
          activeColor={habitDetails.colors.backgroundActiveColor}
          borderColor={Colors.border}
          style={styles.colorIcon}
        />
      </TouchableOpacity>

      {/* Reminders is not a feature currently enabled */}
      <TouchableOpacity
        onPress={() => navigation.navigate('test')}
        style={styles.habitItem}
        disabled={true}>
        <IonIcon
          style={styles.habitIcon}
          name="notifications-outline"
          color={'gray'}
          size={24}
        />
        <Text style={[styles.habitText, {color: 'gray'}]}>Reminders</Text>
        <NumberIcon number={`0`} borderColor="gray" textColor="gray" />
      </TouchableOpacity>

      {/* Order is only for Editing */}
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('test')}
        style={styles.habitItem}>
        <IonIcon
          style={styles.habitIcon}
          name="list"
          color={'black'}
          size={24}
        />
        <Text style={styles.habitText}>Order</Text>
        <NumberIcon number={habitDetails.order} />
      </TouchableOpacity> */}

      <Button
        title="Create New Habit"
        onPress={() => {
          // if (habitList) {
          //   setHabitList((prevState) => [...prevState, habitDetails]);
          // } else {
          //   setHabitList([habitDetails]);
          // }
          storeHabit(habitDetails);
        }}></Button>
      <Button
        title="Log Details"
        onPress={async () => {
          console.log(habitDetails);
          // console.log(habitList);
          // let habits = await getHabits();
          // console.log(habits);
        }}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    margin: 17,
  },
  habitItem: {
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
  habitText: {
    margin: 3,
  },
  rightIcon: {
    marginLeft: 'auto',
  },
  colorIcon: {
    position: 'absolute',
    marginRight: 3,
    marginLeft: 'auto',
    right: 0,
  },
});

export default AddHabitMain;
