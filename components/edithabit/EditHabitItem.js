import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {EditHabitContext} from '../contexts/EditHabitContext';
import {HabitListContext} from '../contexts/HabitListContext';
import {DefaultColors as Colors, DefaultColors} from '../settings/Colors';
import {deleteHabit, editHabit} from '../settings/Storage';

import OkModal from '../modal/OkModal';
import ScheduleItem from '../items/ScheduleItem';
import ColorIcon from '../icons/ColorIcon';
import NumberIcon from '../icons/NumberIcon';

import AntIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const EditHabitItem = ({route, navigation}) => {
  const [allHabits, , reloadContext, setReloadContext] = useContext(
    EditHabitContext,
  );
  const [
    habitList,
    setHabitList,
    passedDays,
    reloadHabitListContext,
    setReloadHabitListContext,
  ] = useContext(HabitListContext);
  const [modalVisible, setModalVisible] = useState(false);
  const {index, ...rest} = route.params;
  const [habitDetails, setHabitDetails] = useState(allHabits[index]);

  useEffect(() => {
    if (route.params?.category) {
      setHabitDetails((prevState) => {
        return {
          ...prevState,
          category: route.params.category,
        };
      });
    }
    if (route.params?.colors) {
      setHabitDetails((prevState) => {
        return {
          ...prevState,
          colors: route.params.colors,
        };
      });
    }
  }, [route.params?.category, route.params?.colors]);

  return (
    <View style={styles.container}>
      <OkModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'Scheduled Days'}
        modalHeader={true}
        modalFooter={true}>
        {habitDetails && (
          <FlatList
            style={{marginRight: 1}}
            data={habitDetails.schedule}
            renderItem={({item, index}) => (
              <ScheduleItem
                index={index}
                day={item.day}
                active={item.active}
                habitDetails={habitDetails}
                setHabitDetails={setHabitDetails}
              />
            )}
            keyExtractor={(item) => `${item.day}`}
            extraData={habitDetails.schedule}
          />
        )}
      </OkModal>
      <View style={styles.habitItem}>
        <MCIcon
          style={styles.habitIcon}
          name="lead-pencil"
          color={'black'}
          size={26}
        />
        <TextInput
          style={{flex: 1}}
          placeholder="Habit Name"
          value={habitDetails.name}
          onChangeText={(text) =>
            setHabitDetails({...habitDetails, name: text})
          }></TextInput>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('EditCategories', {
            selectedCategory: habitDetails.category,
            parentRoute: route.name,
          })
        }
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
          style={{flex: 1}}
          placeholder="Description"
          value={habitDetails.description}
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
        onPress={() =>
          navigation.navigate('EditHabitColors', {
            colors: habitDetails.colors,
            parentRoute: route.name,
          })
        }
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
      <TouchableOpacity
        onPress={async () => {
          const success = await deleteHabit(habitDetails);
          if (success === 'Success') {
            setReloadContext(!reloadContext);
            setReloadHabitListContext(!reloadHabitListContext);
            navigation.navigate('EditHabitMain');
          }
        }}
        style={styles.habitItem}>
        <IonIcon
          style={styles.habitIcon}
          name="trash-outline"
          color={'black'}
          size={24}
        />
        <Text style={[styles.habitText, {color: 'black'}]}>Delete Habit</Text>
        {/* <MCIcon
          style={styles.rightIcon}
          name="code-greater-than"
          color={'black'}
          size={26}
        /> */}
      </TouchableOpacity>
      <Button
        title="Save Edit"
        onPress={async () => {
          const success = await editHabit(habitDetails);
          if (success === 'Success') {
            console.log('Successfully Edited Habit');
            // send to main screen
            navigation.navigate('EditHabitMain');
            // reload Context's when habit is edited
            setReloadContext(!reloadContext);
            setReloadHabitListContext(!reloadHabitListContext);
          } else {
            // show error
          }
        }}></Button>
      <Button
        title="Log Details"
        onPress={async () => {
          // console.log(habitDetails);
          console.log(habitDetails.name, habitDetails.description);
        }}></Button>
      <Button
        title="Log schedule"
        onPress={() => {
          // console.log(allHabits[index]);
          // console.log(habitDetails);
          // console.log(uuidv4());
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
  modalHeader: {
    // display: 'flex',
    alignItems: 'center',
    // width: '100%',
    margin: 5,
    marginLeft: 20,
    fontSize: 18,
  },
  modalFooter: {
    display: 'flex',
    flexDirection: 'row-reverse',
    margin: 3,
  },
  modalButton: {
    padding: 8,
    paddingHorizontal: 15,
    marginRight: 5,
    fontSize: 15,
  },
});

export default EditHabitItem;
