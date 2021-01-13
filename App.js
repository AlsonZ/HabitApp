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
import Colors from './components/settings/colors';

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
            textColor={Colors.gray}
            backgroundColor={Colors.transparent}
            textActiveColor={Colors.white}
            backgroundActiveColor={Colors.blue}
            onPress={press}></HabitButton>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
