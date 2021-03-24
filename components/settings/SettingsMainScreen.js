import React, {useContext} from 'react';
import {ScrollView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import ColorIcon from '../icons/ColorIcon';
import {ThemeContext} from '../contexts/ThemeContext';

const SettingsMainScreen = ({navigation}) => {
  const [theme] = useContext(ThemeContext);
  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContainer,
        {backgroundColor: theme.backgroundColor},
      ]}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SettingsThemeScreen')}
        style={styles.habitItem}>
        <Icon
          name="gear"
          color={theme.iconColor}
          size={26}
          style={styles.habitIcon}
        />
        <Text
          numberOfLines={1}
          style={[styles.habitText, {color: theme.textColor}]}>
          Theme
        </Text>
        <ColorIcon
          style={[styles.rightIcon, styles.colorIcon]}
          activeColor={theme.backgroundColor}
          borderColor={theme.borderColor}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('SettingsHabitButtonScreen')}
        style={styles.habitItem}>
        <Icon
          name="gear"
          color={theme.iconColor}
          size={26}
          style={styles.habitIcon}
        />
        <Text
          numberOfLines={1}
          style={[styles.habitText, {color: theme.textColor}]}>
          HabitButton
        </Text>
        <MCIcon
          style={styles.rightListContent}
          name="arrow-right"
          color={theme.iconColor}
          size={26}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 17,
  },
  habitItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    marginVertical: 3,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
  },
  colorIcon: {
    width: 22,
    height: 22,
  },
  habitIcon: {
    width: 35,
    height: 25,
  },
  habitText: {
    margin: 3,
  },
  rightIcon: {
    marginLeft: 'auto',
  },
  rightListContent: {
    marginLeft: 'auto',
  },
  colorIcon: {},
});

export default SettingsMainScreen;
