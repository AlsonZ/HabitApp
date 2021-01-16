import React from 'react';
import {View, Text, Button} from 'react-native';

const AddHabitMain = ({navigation}) => {
  return (
    <View>
      <Text>Add Habit Main</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('test')}
      />
    </View>
  );
};

export default AddHabitMain;
