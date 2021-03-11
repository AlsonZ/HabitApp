import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Clock = ({
  showHour = true,
  showMinute = true,
  showSecond = false,
  showDayTime = false,
  militaryTime = false,
}) => {
  const [hour, setHour] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [dayTime, setDayTime] = useState('pm');

  const calculateTime = () => {
    let date = new Date();
    let hr = date.getUTCHours();
    let min = date.getUTCMinutes();
    let sec = date.getUTCSeconds();
    let dt = date.getUTCHours();

    if (min < 10) {
      min = '0' + min;
    }

    if (sec < 10) {
      sec = '0' + sec;
    }

    if (hr > 12) {
      hr = hr - 12;
    }

    if (hr == 0) {
      hr = 12;
    }

    if (`${hr}` !== hour) {
      setHour(`${hr}`);
    }
    if (`${min}` !== minutes) {
      setMinutes(`${min}`);
    }
    if (`${sec}` !== seconds) {
      setSeconds(`${sec}`);
    }
    if (`${dt}` < 12) {
      setDayTime('am');
    } else {
      setDayTime('pm');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      calculateTime();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      {showHour && <Text style={styles.text}>{hour} </Text>}
      {showMinute && <Text style={styles.text}>: {minutes} </Text>}
      {showSecond && <Text style={styles.text}>: {seconds}</Text>}
      {showDayTime && <Text style={styles.text}> {dayTime}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  text: {
    color: 'white',
  },
});

export default Clock;
