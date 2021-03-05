import React from 'react';
import {Pressable, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const CategoryListItem = ({category, selectCategory}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        selectCategory(category);
      }}
      style={styles.categoryItem}>
      <Text style={styles.categoryText}>{category}</Text>
      <MCIcon
        style={styles.rightIcon}
        name="code-greater-than"
        color={'black'}
        size={26}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    marginBottom: 6,
    marginRight: 16,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  categoryText: {
    margin: 38,
  },
  rightIcon: {
    marginLeft: 'auto',
  },
});

export default CategoryListItem;
