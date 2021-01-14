import 'react-native-gesture-handler';
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
import HabitButton from './components/HabitButton';
import Colors from './components/settings/Colors';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './components/TabNavigation';

const App = () => {
  const press = () => {};

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        {/* <View>
          <Button title="Test" style={styles.habitButton}></Button>
          <HabitButton
            title="Habit"
            textColor={Colors.gray}
            backgroundColor={Colors.transparent}
            textActiveColor={Colors.white}
            backgroundActiveColor={Colors.blue}
            onPress={press}></HabitButton>
        </View> */}
        <TabNavigation />
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
