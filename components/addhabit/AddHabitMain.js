import React, {useContext, useEffect, useState} from 'react';
import {AddHabitContext} from '../contexts/AddHabitContext';
import {HabitListContext} from '../contexts/HabitListContext';
import {EditHabitContext} from '../contexts/EditHabitContext';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ScrollView,
} from 'react-native';
import ScheduleItem from '../items/ScheduleItem';

import {DefaultColors as Colors, DefaultColors} from '../settings/Colors';
import OkModal from '../modal/OkModal';
import ColorIcon from '../icons/ColorIcon';
import NumberIcon from '../icons/NumberIcon';

import AntIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getAllHabits, storeNewHabit} from '../settings/Storage';
import {config} from '../config/config';

const AddHabitMain = ({navigation, route}) => {
  const [habitDetails, setHabitDetails, reloadAddHabitContext] = useContext(
    AddHabitContext,
  );
  const [, , reloadEditContext, setReloadEditContext] = useContext(
    EditHabitContext,
  );
  const [, , , reloadContext, setReloadContext] = useContext(HabitListContext);
  const [modalVisible, setModalVisible] = useState(false);

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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* <OkModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'Scheduled Days'}
        modalHeader={true}
        modalFooter={true}>
        <FlatList
          style={{marginRight: 1}}
          data={config.scheduleType}
          renderItem={({item, index}) => (
            <ScheduleItem
              index={index}
              // day={item.day}
              active={habitDetails.scheduleType}
              habitDetails={habitDetails}
              setHabitDetails={setHabitDetails}
            />
          )}
          keyExtractor={(item) => `${item.name}`}
          extraData={habitDetails.scheduleType}
        />
        {Object.keys(config.scheduleType).map((key) => {
          return (
            <ScheduleItem
              key={config.scheduleType[key].name}
              scheduleType={config.scheduleType[key]}
            />
          );
        })}
      </OkModal> */}
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
          navigation.navigate('AddHabitCategory', {
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
          // setModalVisible(true);
          navigation.navigate('AddHabitSchedule');
        }}
        style={styles.habitItem}>
        <FontistoIcon
          style={styles.habitIcon}
          name="date"
          color={'black'}
          size={24}
        />
        <Text style={styles.habitText}>Schedule Type</Text>
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
        <Text style={[styles.habitText, {color: 'gray'}]}>Frequency</Text>
        <NumberIcon
          number={habitDetails.frequency}
          borderColor="gray"
          textColor="gray"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AddHabitColors', {
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

      <View style={styles.buttonContainer}>
        <Button
          title="Create New Habit"
          onPress={async () => {
            const success = await storeNewHabit(habitDetails);
            // const success = 'Success';
            if (success === 'Success') {
              // show modal popup for success with 3 buttons
              // one to go to home, other to continue making duplicate habit
              // one to start new
              // reload Context's when new habit is added
              setReloadContext(!reloadContext);
              setReloadAddHabitContext();
              setReloadEditContext(!reloadEditContext);
              // send to main screen
              navigation.navigate('Home');
            } else if (success === 'Name Matches Existing Habit') {
              //show modal popup for error
              console.log(success);
            }
          }}></Button>
        {/* <Button
          title="Log Details"
          onPress={async () => {
            console.log(habitDetails);
          }}></Button> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    display: 'flex',
    flexGrow: 1,
    padding: 17,
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: 17,
  },
});

export default AddHabitMain;
