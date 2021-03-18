import React, {useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorIcon from '../../icons/ColorIcon';
import {HabitButtonContext} from '../../contexts/HabitButtonContext';

const SettingsHabitButtonScreen = ({navigation, route}) => {
  const [habitButtonSettings, setHabitButtonSettings, reload] = useContext(
    HabitButtonContext,
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <TouchableOpacity
        onPress={() => {
          // open modal and select app or list view
        }}
        style={styles.listItem}>
        {/* <Icon name="gear" color={'black'} size={26} style={styles.habitIcon} /> */}
        <Text numberOfLines={1} style={styles.listText}>
          HabitButton
        </Text>
        <View style={styles.rightListContent}>
          <Text style={styles.listText}>List View</Text>
          {/* i can either use icons or words or both here */}
          {/* <IonIcon
              style={styles.habitIcon}
              name="ios-menu"
              color={'white'}
              size={32}
            />
            <AntIcon
              style={styles.habitIcon}
              name="appstore-o"
              color={'white'}
              size={26}
            /> */}
        </View>
        {/* <MCIcon
          style={styles.rightIcon}
          name="code-greater-than"
          color={'black'}
          size={26}
        /> */}
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
        <Text numberOfLines={1} style={styles.listText}>
          Select Default Button Colors
        </Text>
        <ColorIcon
          style={[styles.rightListContent, styles.colorIcon]}
          activeColor={'black'}
          borderColor={'black'}
          parentRoute={route.name}
        />
        {/* <MCIcon
          style={styles.rightListContent}
          name="arrow-right"
          color={'black'}
          size={26}
        /> */}
      </TouchableOpacity>
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
  rightListContent: {
    marginLeft: 'auto',
  },
});

export default SettingsHabitButtonScreen;
