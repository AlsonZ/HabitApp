import React, {useContext, useEffect, useState} from 'react';
import {EditHabitContext} from '../contexts/EditHabitContext';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';

import AntIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const EditHabitMain = ({navigation}) => {
  const [allHabits, setAllHabits] = useContext(EditHabitContext);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={allHabits}
        renderItem={({item, index}) => (
          <TouchableOpacity
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
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => `${item.name}${index}`}
        extraData={allHabits}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('AddNewHabit');
        }}>
        <AntIcon name="plus" color={'white'} size={26} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    // margin: 2,
  },
  listContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
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
  habitIcon: {
    width: 35,
    height: 25,
  },
  habitText: {
    margin: 3,
    flex: 1,
  },
  rightIcon: {
    marginLeft: 'auto',
  },
  addButton: {
    position: 'absolute',
    margin: 10,
    bottom: 0,
    right: 0,
    width: 64,
    height: 64,
    backgroundColor: 'lightblue',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditHabitMain;
