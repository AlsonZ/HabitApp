import React, {useEffect, useState} from 'react';
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ColorIcon from '../icons/ColorIcon';
import {HabitColors} from '../settings/Colors';
import HabitButton from '../HabitButton';
import ModalItem from '../modal/ModalItem';

const HabitColorItem = ({navigation, route}) => {
  const parentRoute = route.params.parentRoute;
  const [HabitButtonColors, setHabbitButtonColors] = useState({
    ...route.params.colors,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [chosenColor, setChosenColor] = useState('');
  const [currentEditingColor, setCurrentEditingColor] = useState('');

  useEffect(() => {
    if (chosenColor != '') {
      let HabitButtonColorsCopy = Object.assign({}, HabitButtonColors);
      HabitButtonColorsCopy[currentEditingColor] = chosenColor;
      setHabbitButtonColors(HabitButtonColorsCopy);
    }
  }, [chosenColor]);

  const loadListItems = () => {
    return Object.keys(HabitButtonColors).map((item, index) => {
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
            activeColor={HabitButtonColors[item]}
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
    <ScrollView contentContainerStyle={styles.container}>
      <ModalItem modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <View style={styles.modalView}>{loadHabitColors()}</View>
      </ModalItem>
      {loadListItems()}
      <View style={styles.exampleHabitItemContainer}>
        <Text>Example Habit Item</Text>
        <HabitButton
          title="Habit"
          textColor={HabitButtonColors.textColor}
          backgroundColor={HabitButtonColors.backgroundColor}
          textActiveColor={HabitButtonColors.textActiveColor}
          backgroundActiveColor={HabitButtonColors.backgroundActiveColor}
        />
        <Text style={styles.smallText}>Press Item to show active colors</Text>
      </View>
      <View style={styles.saveButtonContainer}>
        <Button
          title="Save"
          onPress={() => {
            navigation.navigate(parentRoute, {
              colors: HabitButtonColors,
            });
          }}></Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: 17,
  },
  listItem: {
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
    marginTop: 30,
  },
  smallText: {
    fontSize: 11,
  },
  saveButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: 17,
  },
});

export default HabitColorItem;
