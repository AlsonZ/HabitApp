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
  selectedValueIndex,
  setSelectedValueIndex,
  width = 80,
  itemHeight = 40,
  fontSize = 20,
  selectedValueStyle = {},
  userSelectedIndex,
  title = '',
  titleStyle,
}) => {
  const flatListRef = useRef(null);
  let offsetValues = [...Array(values.length)].map(
    (_, index) => index * itemHeight,
  );
  const flatListData = [...values, '', ''];

  useEffect(() => {
    scrollToValue(userSelectedIndex);
  }, [userSelectedIndex]);

  const scrollToValue = async (valueIndex) => {
    await flatListRef.current.scrollToIndex({index: valueIndex});
  };

  const handleScroll = ({nativeEvent}) => {
    const index = Math.round(nativeEvent.contentOffset.y / itemHeight);
    setSelectedValueIndex(index);
  };

  const DurationItem = React.memo(({text, index}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setSelectedValueIndex(index);
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
      <View
        style={[
          {
            position: 'absolute',
            width: '100%',
            top: 0,
            paddingBottom: 10,
            zIndex: 1,
          },
          titleStyle,
        ]}>
        <Text style={{textAlign: 'center'}}>{title}</Text>
      </View>
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
        initialScrollIndex={selectedValueIndex}
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
