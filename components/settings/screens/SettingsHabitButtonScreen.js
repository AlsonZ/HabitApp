import React, {useEffect, useContext} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import ColorIcon from '../../icons/ColorIcon';
import {storeOrEditDefaultHabitButton} from '../../storage/Storage';
import {HabitButtonContext} from '../../contexts/HabitButtonContext';
import {ThemeContext} from '../../contexts/ThemeContext';

const SettingsHabitButtonScreen = ({navigation, route}) => {
  const [
    habitButtonSettings,
    setHabitButtonSettings,
    reloadHabitButtonContext,
  ] = useContext(HabitButtonContext);
  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    if (route.params?.colors) {
      setHabitButtonSettings((prevState) => {
        return {
          ...prevState,
          colors: route.params.colors,
        };
      });
    }
  }, [route.params?.colors]);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollView,
        {backgroundColor: theme.backgroundColor},
      ]}>
      <TouchableOpacity
        onPress={() => {
          let buttonView = 'list';
          if (habitButtonSettings.habitButtonView === 'list') {
            buttonView = 'app';
          }
          setHabitButtonSettings((prevState) => ({
            ...prevState,
            habitButtonView: buttonView,
          }));
        }}
        style={styles.listItem}>
        <Text
          numberOfLines={1}
          style={[styles.listText, {color: theme.textColor}]}>
          HabitButton
        </Text>
        <View style={[styles.rightListContent, styles.buttonView]}>
          {habitButtonSettings.habitButtonView === 'list' && (
            <>
              <Text style={[styles.listText, {color: theme.textColor}]}>
                List View
              </Text>
              <IonIcon
                style={[styles.listIcon, {margin: -3, padding: -3}]}
                name="ios-menu"
                color={theme.iconColor}
                size={32}
              />
            </>
          )}
          {habitButtonSettings.habitButtonView === 'app' && (
            <>
              <Text style={[styles.listText, {color: theme.textColor}]}>
                App View
              </Text>
              <AntIcon
                style={styles.listIcon}
                name="appstore-o"
                color={theme.iconColor}
                size={26}
              />
            </>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // open modal and select app or list view
          navigation.navigate('SettingsHabitButtonDefaultColorScreen', {
            colors: habitButtonSettings.colors,
            parentRoute: route.name,
          });
        }}
        style={styles.listItem}>
        {/* <Icon name="gear" color={'black'} size={26} style={styles.habitIcon} /> */}
        <Text
          numberOfLines={1}
          style={[styles.listText, {color: theme.textColor}]}>
          Select Default Button Colors
        </Text>
        <ColorIcon
          style={[styles.rightListContent, styles.colorIcon]}
          activeColor={habitButtonSettings.colors.backgroundActiveColor}
          borderColor={habitButtonSettings.colors.textActiveColor}
          parentRoute={route.name}
        />
        {/* <MCIcon
          style={styles.rightListContent}
          name="arrow-right"
          color={'black'}
          size={26}
        /> */}
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Button
          onPress={async () => {
            // save HabitButtonContext to storage
            await storeOrEditDefaultHabitButton(habitButtonSettings);
            // reload context
            reloadHabitButtonContext();
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
    flex: 1,
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
  listText: {
    margin: 3,
  },
  listIcon: {},
  rightListContent: {
    marginLeft: 'auto',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: 17,
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorIcon: {
    margin: 3,
  },
});

export default SettingsHabitButtonScreen;
