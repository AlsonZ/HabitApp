import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Clock = () => {
  const [hour, setHour] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  useEffect(() => {
    // return () => {
    //   cleanup;
    // };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}> {hour} :</Text>
      <Text style={styles.text}> {minutes} :</Text>
      <Text style={styles.text}> {seconds}</Text>
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
