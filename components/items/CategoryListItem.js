import React, {useContext} from 'react';
import {Pressable, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../contexts/ThemeContext';

const CategoryListItem = ({category, selectCategory, deleteCategory}) => {
  const [theme] = useContext(ThemeContext);

  return (
    <Pressable
      onPress={() => {
        selectCategory(category);
      }}
      onLongPress={() => {
        deleteCategory(category);
      }}
      style={styles.categoryItem}>
      <Text style={[styles.categoryText, {color: theme.textColor}]}>
        {category}
      </Text>
      <MCIcon
        style={styles.rightIcon}
        name="arrow-right"
        color={theme.iconColor}
        size={26}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    marginBottom: 6,
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
