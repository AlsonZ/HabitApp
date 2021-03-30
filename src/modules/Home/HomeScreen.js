import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Calendar from '../../components/Calendar';
import {isAfter} from 'date-fns';
import {getTodaysDateObject} from '../../date/DateHandler';
import HabitAppIcon from '../../components/HabitAppIcon';

const HomeScreen = ({
  habitButtonView = 'list',
  loadedHabits,
  currentlyLoadedDay,
  loadDay,
}) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    // 84 is width
    if (habitButtonView === 'app') {
      setColumns(parseInt(windowWidth / 84));
    } else if (habitButtonView === 'list') {
      setColumns(1);
    }
  }, [windowWidth, windowHeight, habitButtonView]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Calendar
        onload={() => {}}
        loadDay={loadDay}
        currentlyLoadedDay={currentlyLoadedDay}
      />
      <FlatList
        contentContainerStyle={[styles.habitContainer]}
        key={columns}
        numColumns={columns}
        data={loadedHabits}
        extraData={loadedHabits}
        keyExtractor={(item) => `${item.id}${item.name}`}
        renderItem={({item}) => (
          <HabitAppIcon
            disabled={false}
            title={item.name}
            description={item.description}
            textColor={item.colors.textColor}
            textActiveColor={item.colors.textActiveColor}
            backgroundColor={item.colors.backgroundColor}
            backgroundActiveColor={item.colors.backgroundActiveColor}
            completed={item.completed}
            onPress={() => {
              console.log('pressed icon');
            }}
          />
          // <HabitButton
          //   disabled={isAfter(currentlyLoadedDay, getTodaysDateObject())}
          //   title={item.name}
          //   description={item.description}
          //   // temp colors, may change theme to affect all colors, textColor may be just default with theme
          //   textColor={
          //     theme.backgroundColor === 'black'
          //       ? habitButtonSettings.colors.textColor
          //       : item.colors.textColor
          //   }
          //   backgroundColor={item.colors.backgroundColor} // add styling to make this auto transparent and not dependent on the rgba here
          //   // backgroundColor={'red'} // add styling to make this auto transparent and not dependent on the rgba here
          //   textActiveColor={
          //     theme.backgroundColor === 'black'
          //       ? 'white'
          //       : item.colors.textActiveColor
          //   }
          //   backgroundActiveColor={item.colors.backgroundActiveColor}
          //   completed={item.completed}
          //   listView={habitButtonView === 'list'}
          //   onPress={() => {
          //     // set completed
          //     item.completed = !item.completed;
          //     // update habit
          //     updateHabit(
          //       item,
          //       // formatDate(new Date(calendarRef.current.getSelectedDate())),
          //       currentlyLoadedDay,
          //     );
          //   }}
          // />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  habitContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 17,
    paddingHorizontal: 17,
  },
});

export default HomeScreen;
