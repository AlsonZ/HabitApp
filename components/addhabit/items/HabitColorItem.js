import React, {useContext, useState} from 'react';
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AddHabitContext} from '../../contexts/AddHabitContext';

const HabitColorItem = ({navigation}) => {
  const [habitDetails, setHabitDetails] = useContext(AddHabitContext);

  const [modalVisible, setModalVisible] = useState(false);

  // return (
  //   <TouchableOpacity style={styles.listItem} onPress={setSchedule}>
  //     <FontistoIcon
  //       style={styles.habitIcon}
  //       name="date"
  //       color={'black'}
  //       size={24}
  //     />
  //     <Text>
  //       {day} {dayText}
  //     </Text>
  //   </TouchableOpacity>
  // );

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible}>
        <Text>lol</Text>
        <Button
          title="Close"
          onPress={() => {
            setModalVisible(false);
          }}></Button>
      </Modal>
      <Button
        title="Open"
        onPress={() => {
          setModalVisible(true);
        }}></Button>
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

export default HabitColorItem;
