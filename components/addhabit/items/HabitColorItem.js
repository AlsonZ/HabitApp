import React, {useContext, useEffect, useState} from 'react';
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
import ColorIcon from '../../icons/ColorIcon';
import {HabitColors} from '../../settings/Colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import HabitButton from '../../HabitButton';
import ModalItem from '../../modal/ModalItem';

const HabitColorItem = ({navigation}) => {
  const [habitDetails, setHabitDetails] = useContext(AddHabitContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [chosenColor, setChosenColor] = useState('');
  const [currentEditingColor, setCurrentEditingColor] = useState('');

  useEffect(() => {
    if (chosenColor != '') {
      // setHabitDetails((prevState) => ({
      //   ...prevState,
      //   colors: {
      //     ...prevState.colors,
      //     [currentEditingColor]: chosenColor,
      //   },
      // }));

      // this way of updating state keeps existing list order
      // as react native does not have flex ordering
      let habitDetailsCopy = Object.assign({}, habitDetails);
      habitDetailsCopy.colors[currentEditingColor] = chosenColor;
      setHabitDetails(habitDetailsCopy);
    }
  }, [chosenColor]);

  const loadListItems = () => {
    return Object.keys(habitDetails.colors).map((item, index) => {
      let name = item;
      switch (item) {
        case 'textColor':
          name = 'Inactive Text Color';
          break;
        case 'backgroundColor':
          name = 'Inactive Background Color';
          break;
        case 'textActiveColor':
          name = 'Active Text Color';
          break;
        case 'backgroundActiveColor':
          name = 'Active Background Color';
          break;
      }
      return (
        <TouchableOpacity
          key={index + item}
          style={styles.listItem}
          onPress={() => {
            setModalVisible(true);
            setCurrentEditingColor(item);
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
    return Object.keys(HabitColors).map((colorKey, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setChosenColor(colorKey);
            setModalVisible(false);
          }}>
          <ColorIcon
            activeColor={HabitColors[colorKey]}
            borderColor="black"
            style={{width: 50, height: 50, margin: 5}}
          />
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <ModalItem modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <View style={styles.modalView}>{loadHabitColors()}</View>
      </ModalItem>
      {loadListItems()}
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.exampleHabitItemContainer}>
          <Text>Example Habit Item</Text>
          <HabitButton
            title="Habit"
            textColor={habitDetails.colors.textColor}
            backgroundColor={habitDetails.colors.backgroundColor}
            textActiveColor={habitDetails.colors.textActiveColor}
            backgroundActiveColor={habitDetails.colors.backgroundActiveColor}
          />
          <Text style={styles.smallText}>Press Item to show active colors</Text>
        </View>
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
  modalView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    borderRadius: 5,
  },
  colorIcon: {
    position: 'absolute',
    marginRight: 3,
    marginLeft: 'auto',
    right: 0,
  },
  exampleHabitItemContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
  },
  smallText: {
    fontSize: 11,
  },
});

export default HabitColorItem;
