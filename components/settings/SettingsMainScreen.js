import React from 'react';
import {ScrollView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorIcon from '../icons/ColorIcon';

const SettingsMainScreen = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SettingsThemeScreen')}
        style={styles.habitItem}>
        <ColorIcon
          activeColor={'black'}
          borderColor={'black'}
          // style={styles.colorIcon}
        />
        <Text numberOfLines={1} style={styles.habitText}>
          Theme
        </Text>
        <MCIcon
          style={styles.rightIcon}
          name="code-greater-than"
          color={'black'}
          size={26}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() =>
          navigation.navigate('EditHabitItem', {
            index: index,
          })
        }
        style={styles.habitItem}>
        <AntIcon
          style={styles.habitIcon}
          name="appstore-o"
          color={'black'}
          size={26}
        />
        <Text numberOfLines={1} style={styles.habitText}>
          {item.name}
        </Text>
        <MCIcon
          style={styles.rightIcon}
          name="code-greater-than"
          color={'black'}
          size={26}
        />
      </TouchableOpacity> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    flexGrow: 1,
    padding: 17,
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
});

export default SettingsMainScreen;
