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
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddHabitMain = ({navigation}) => {
  const [habitDetails, setHabitDetails] = useContext(AddHabitContext);

  return (
    <View style={styles.container}>
      <View style={styles.habitItem}>
        <MCIcon name="lead-pencil" color={'black'} size={26} />
        <TextInput
          placeholder="Habit Name"
          onChangeText={(text) =>
            setHabitDetails({...habitDetails, name: text})
          }></TextInput>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('test')}
        style={styles.habitItem}>
        <MCIcon name="apps" color={'black'} size={26} />
        <Text>{habitDetails.category}</Text>
        <MCIcon
          style={styles.rightIcon}
          name="code-greater-than"
          color={'black'}
          size={26}
        />
      </TouchableOpacity>
      <Button
        title="test"
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
    height: 40,
    marginBottom: 6,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rightIcon: {
    marginLeft: 'auto',
  },
});

export default AddHabitMain;
