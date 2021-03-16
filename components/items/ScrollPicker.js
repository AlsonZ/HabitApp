import React, {useState, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ScrollPicker = ({
  values,
  selectedValue,
  setSelectedValue,
  width = 100,
  itemHeight = 40,
  fontSize = 20,
}) => {
  // const [currentlyChosen, setCurrentlyChosen] = useState(0);
  const durationPickerScrollView = useRef(null);

  const DurationItem = ({text, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedValue(values[index]);
          durationPickerScrollView.current.scrollTo({
            y: index * itemHeight,
            animated: true,
          });
        }}
        style={{height: itemHeight}}>
        <Text
          style={[
            styles.itemText,
            {
              fontSize: fontSize,
              height: itemHeight,
              lineHeight: itemHeight - itemHeight / 8,
            },
          ]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.pickerContainer,
        {
          height: itemHeight * 3,
          width: width,
          marginTop: itemHeight,
        },
      ]}>
      <View
        style={[styles.pickerSelector, {height: itemHeight, top: itemHeight}]}
      />
      <ScrollView
        ref={durationPickerScrollView}
        snapToInterval={itemHeight}
        showsVerticalScrollIndicator={false}
        style={[styles.scrollView, {paddingTop: itemHeight}]}>
        {values.map((value, index) => (
          <DurationItem key={value + index} text={value} index={index} />
        ))}
        <View style={{height: itemHeight * 2}}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerSelector: {
    position: 'absolute',
    backgroundColor: 'rgba(255,1,1,0.5)',
    width: '100%',
    borderRadius: 10,
  },
  scrollView: {
    width: '100%',
  },
  itemText: {
    // borderColor: 'black',
    // borderWidth: 1,
    textAlign: 'center',
  },
});

export default ScrollPicker;
