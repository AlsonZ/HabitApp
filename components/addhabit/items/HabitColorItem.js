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
import IonIcon from 'react-native-vector-icons/Ionicons';
import HabitButton from '../../HabitButton';

const HabitColorItem = ({navigation}) => {
  const [habitDetails, setHabitDetails] = useContext(AddHabitContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [chosenColor, setChosenColor] = useState(HabitColors.black);

  const loadListItems = () => {
    return Object.keys(habitDetails.colors).map((item) => {
      let name = item;
      switch (item) {
        case 'textColor':
          name = 'Inactive Text Color';
          break;
        case 'backgroundColor':
          name = 'Inactive Background Color';
          break;
        case 'textActiveColor':
          name = 'Active Background Color';
          break;
        case 'backgroundActiveColor':
          name = 'Active Background Color';
          break;
      }
      return (
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => {
            setModalVisible(true);
          }}>
          <IonIcon
            style={styles.habitIcon}
            name="color-palette-outline"
            color={'black'}
            size={24}
          />
          <Text>{name}</Text>
          <ColorIcon
            activeColor={habitDetails.colors[item]}
            style={styles.colorIcon}
          />
        </TouchableOpacity>
      );
    });
  };

  const loadHabitColors = () => {
    return Object.keys(HabitColors).map((color, index) => {
      return (
        <ColorIcon
          key={index}
          activeColor={HabitColors[color]}
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
      {loadListItems()}
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <HabitButton
          title="Habit"
          textColor={habitDetails.colors.textColor}
          backgroundColor={habitDetails.colors.backgroundColor}
          textActiveColor={habitDetails.colors.textActiveColor}
          backgroundActiveColor={habitDetails.colors.backgroundActiveColor}
        />
      </View>
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
  colorIcon: {
    position: 'absolute',
    marginRight: 3,
    marginLeft: 'auto',
    right: 0,
  },
});

export default HabitColorItem;
