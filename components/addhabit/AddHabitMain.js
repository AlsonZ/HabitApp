import React, {useContext} from 'react';
import {AddHabitContext} from '../contexts/AddHabitContext';
import {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddHabitMain = ({navigation}) => {
  const [habitDetails, setHabitDetails] = useContext(AddHabitContext);

  return (
    <View>
      <Text>Add Habit Main</Text>
      <View style={styles.habitItem}>
        <MCIcon name="lead-pencil" color={'black'} size={26} />
        <TextInput
          placeholder="Habit Name"
          onChangeText={(text) =>
            setHabitDetails({...habitDetails, name: text})
          }></TextInput>
      </View>
      <Button
        title="test"
        onPress={() => {
          console.log(habitDetails);
        }}></Button>
      <TouchableOpacity
        onPress={() => navigation.navigate('test')}
        style={styles.habitItem}>
        <MCIcon name="apps" color={'black'} size={26} />
        <Text>{habitDetails.category}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  habitItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AddHabitMain;
