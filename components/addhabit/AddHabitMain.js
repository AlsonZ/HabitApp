import React from 'react';
import {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddHabitMain = ({navigation}) => {
  const [habitName, setHabitName] = useState('');

  return (
    <View>
      <Text>Add Habit Main</Text>
      <View style={styles.habitItem}>
        <MCIcon name="lead-pencil" color={'black'} size={26} />
        <TextInput
          placeholder="Habit Name"
          onChangeText={(text) => setHabitName(text)}></TextInput>
      </View>

      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('test')}
      />
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
