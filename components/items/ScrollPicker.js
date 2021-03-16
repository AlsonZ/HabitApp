import React, {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const ScrollPicker = ({
  values,
  selectedValue,
  setSelectedValue,
  width = 80,
  itemHeight = 40,
  fontSize = 20,
  selectedValueStyle = {},
}) => {
  const [current, setCurrent] = useState(selectedValue);
  const flatListRef = useRef(null);
  let offsetValues = [...Array(values.length)].map(
    (_, index) => index * itemHeight,
  );
  const flatListData = [...values, '', ''];

  const scrollToValue = (valueIndex) => {
    console.log('Index of selected value is:', valueIndex);
    flatListRef.current.scrollToIndex({index: valueIndex});
  };

  const DurationItem = React.memo(({text, index}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (flatListData[index] !== '') {
            setSelectedValue(flatListData[index]);
          }
          scrollToValue(index);
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
      </TouchableWithoutFeedback>
    );
  });

  const handleScroll = ({nativeEvent}) => {
    const value = Math.round(nativeEvent.contentOffset.y / itemHeight + 1);
    console.log('ScrollTo value:', value);
    // console.log(
    //   nativeEvent.contentOffset.y,
    //   Math.round(nativeEvent.contentOffset.y / itemHeight + 1),
    // );
    if (value !== current) {
      setCurrent(value);
      setSelectedValue(value);
    }
  };

  return (
    <View
      style={[
        styles.pickerContainer,
        {
          height: itemHeight * 3,
          width: width,
        },
      ]}>
      <View
        style={[
          styles.pickerSelector,
          {
            height: itemHeight,
            top: itemHeight,
            backgroundColor: 'rgba(1,1,1,0.1)',
          },
          selectedValueStyle,
        ]}
      />
      <FlatList
        ref={flatListRef}
        contentContainerStyle={[
          styles.scrollView,
          {marginTop: itemHeight, width: width},
        ]}
        getItemLayout={(data, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        initialScrollIndex={selectedValue - 1}
        showsVerticalScrollIndicator={false}
        snapToOffsets={offsetValues}
        onScroll={handleScroll}
        scrollEventThrottle={0}
        data={flatListData}
        renderItem={({item, index}) => (
          <DurationItem text={item} index={index} />
        )}
        keyExtractor={(item, index) => `${item + index * index}`}
      />
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
    width: '100%',
    borderRadius: 15,
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
