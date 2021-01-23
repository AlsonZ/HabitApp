import React, {useContext} from 'react';
import {AddHabitContext} from '../contexts/AddHabitContext';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Colors from '../settings/Colors';
import ColorIcon from './icons/ColorIcon';
import NumberIcon from './icons/NumberIcon';

import AntIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddHabitMain = ({navigation}) => {
  const [habitDetails, setHabitDetails] = useContext(AddHabitContext);

  return (
    <View style={styles.container}>
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
        onPress={() => navigation.navigate('Schedule')}
        style={styles.habitItem}>
        <FontistoIcon
          style={styles.habitIcon}
          name="date"
          color={'black'}
          size={24}
        />
        <Text style={styles.habitText}>Schedule</Text>
        <NumberIcon number={habitDetails.schedule} />
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
        onPress={() => navigation.navigate('test')}
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

      <TouchableOpacity
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
      </TouchableOpacity>

      <Button
        title="Log Details"
        onPress={() => {
          console.log(habitDetails);
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
});

export default AddHabitMain;
