import React from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import {
  getDateObject,
  getDateString,
  getTodaysDateObject,
} from '../date/DateHandler';
import {sub} from 'date-fns';

const Calendar = React.memo(({ref, selectedDate}) => {
  return (
    <CalendarStrip
      // ref={calendarRef}
      scrollable={true}
      // maxDayComponentSize={58}
      startingDate={sub(getTodaysDateObject(), {days: 3})}
      selectedDate={getTodaysDateObject()}
      onDateSelected={(dateString) => {
        const date = getDateObject(new Date(dateString));
        // calendarRef.current.updateWeekView(
        //   sub(date, {
        //     days: 3,
        //   }),
        // );
        // loadDay(date);
      }}
      daySelectionAnimation={{
        type: 'border',
        duration: 200,
        borderWidth: 1,
        // borderHighlightColor: theme.borderColor,
      }}
      style={{
        height: 80,
        paddingVertical: 2,
      }}
      // calendarColor={theme.navTopBarColor}
      // calendarHeaderStyle={{color: theme.textColor, fontSize: 12}}
      // highlightDateNumberStyle={{color: theme.textColor, fontSize: 10}}
      // highlightDateNameStyle={{color: theme.textColor, fontSize: 10}}
      // dateNumberStyle={{color: theme.textColor, fontSize: 12}}
      // dateNameStyle={{color: theme.textColor, fontSize: 12}}
      // iconContainer={{flex: 0.1, paddingBottom: 10}}
      // iconStyle={{height: 25}}
      // iconLeft={require('../imgs/left-arrow-white.png')}
      // iconRight={require('../imgs/right-arrow-white.png')}
    />
  );
});

export default Calendar;
