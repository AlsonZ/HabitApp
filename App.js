import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>
          <Button title="test"></Button>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
