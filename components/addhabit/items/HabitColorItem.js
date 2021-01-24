import React, {useContext, useState} from 'react';
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {AddHabitContext} from '../../contexts/AddHabitContext';
import ColorIcon from '../icons/ColorIcon';
import {HabitColors} from '../../settings/Colors';

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

  const loadHabitColors = () => {
    return Object.keys(HabitColors).map((color) => {
      return (
        <ColorIcon
          activeColor={color}
          borderColor="black"
          style={{width: 50, height: 50, margin: 5}}
        />
      );
    });
  };

  const modalItem = () => {
    return (
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
          }}>
          <View style={styles.modalOverlay}></View>
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>{loadHabitColors()}</View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {modalItem()}
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
    // marginRight: 1,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    marginBottom: 6,
    // marginRight: 16,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  habitIcon: {
    width: 35,
    height: 25,
  },
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '49%',
  },
  modalView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    padding: 35,
    margin: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default HabitColorItem;
