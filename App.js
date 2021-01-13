import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import HabitButton from './components/habitButton';

const App = () => {
  const press = () => {};

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>
          <Button title="Test" style={styles.habitButton}></Button>
          <HabitButton
            title="Habit"
            textColor="white"
            backgroundColor="red"
            onPress={press}></HabitButton>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
