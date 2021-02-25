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

import {getAllHabits, storeNewHabit} from '../settings/Storage';

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
            <Text style={styles.habitText}>{item.name}</Text>
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

      {/* <Button
        title="Log Details"
        onPress={async () => {
          console.log(habitDetails);
        }}></Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    margin: 2,
  },
  listContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 5,
  },
  habitItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    marginBottom: 6,
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

export default EditHabitMain;
