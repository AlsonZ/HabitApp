import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {ThemeContext} from '../../contexts/ThemeContext';
import ColorIcon from '../../icons/ColorIcon';
import ModalItem from '../../modal/ModalItem';
import {storeOrEditTheme} from '../../storage/Storage';

const SettingsThemeScreen = ({navigation}) => {
  const [themeContext, setThemeContext, reloadThemeContext] = useContext(
    ThemeContext,
  );
  const [theme, setTheme] = useState(themeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [chosenColor, setChosenColor] = useState('');
  const [currentEditingColor, setCurrentEditingColor] = useState('');
  const ColorList = {
    gray: 'gray',
    lightgray: 'lightgray',
    white: 'white',
    red: 'red',
    blue: 'blue',
    green: 'green',
    transparent: 'rgba(0, 0, 0, 0.1)',
    border: 'black',
  };

  useEffect(() => {
    if (chosenColor !== '') {
      let themeCopy = Object.assign({}, theme);
      themeCopy[currentEditingColor] = ColorList[chosenColor];
      setTheme(themeCopy);
    }
  }, [chosenColor]);

  const ListColorButton = ({item, color}) => {
    if (item === 'navStatusBarTextColor') {
      return (
        <TouchableOpacity
          key={item}
          style={styles.listItem}
          onPress={() => {
            let themeCopy = Object.assign({}, theme);
            if (color === 'dark-content') {
              themeCopy[item] = 'light-content';
            } else {
              themeCopy[item] = 'dark-content';
            }
            setTheme(themeCopy);
          }}>
          <Text>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
          <View style={[styles.rightListContent, styles.buttonView]}>
            <Text style={styles.listText}>{color}</Text>
            <ColorIcon
              activeColor={color === 'dark-content' ? 'black' : 'white'}
              style={[styles.colorIcon]}
            />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          key={item}
          style={styles.listItem}
          onPress={() => {
            setModalVisible(true);
            setCurrentEditingColor(item);
          }}>
          <Text>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
          <ColorIcon
            activeColor={color}
            style={[styles.rightListContent, styles.colorIcon]}
          />
        </TouchableOpacity>
      );
    }
  };

  const ChooseColorIcon = ({item, color}) => {
    return (
      <TouchableOpacity
        key={item}
        onPress={() => {
          setChosenColor(item);
          setModalVisible(false);
        }}>
        <ColorIcon
          activeColor={color}
          borderColor="black"
          style={{width: 50, height: 50, margin: 5}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <ModalItem modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <View style={styles.modalView}>
          {Object.keys(ColorList).map((item) => (
            <ChooseColorIcon key={item} item={item} color={ColorList[item]} />
          ))}
        </View>
      </ModalItem>
      <ScrollView
        horizontal
        contentContainerStyle={styles.horizontalScrollContainer}>
        <FlatList
          data={Object.keys(themeContext)}
          renderItem={({item}) => (
            <ListColorButton item={item} color={theme[item]} />
          )}
          keyExtractor={(key) => key}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          onPress={async () => {
            // store theme
            await storeOrEditTheme(theme);
            // reload context
            reloadThemeContext();
            navigation.goBack();
          }}
          title="Save"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 17,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    marginVertical: 3,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
  },
  horizontalScrollContainer: {
    width: '100%',
    display: 'flex',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    marginVertical: 17,
  },
  rightListContent: {
    marginLeft: 'auto',
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listText: {
    margin: 5,
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
});

export default SettingsThemeScreen;
