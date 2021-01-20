import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../settings/Colors';
import {CategoriesContext} from '../../contexts/CategoriesContext';
import {AddHabitContext} from '../../contexts/AddHabitContext';

const Category = ({navigation}) => {
  const [categories, setCategories] = useContext(CategoriesContext);
  const [habitDetails, setHabitDetails] = useContext(AddHabitContext);

  const [submitCategoryColor, setSubmitCategoryColor] = useState(Colors.red);
  const [submitCategoryName, setSubmitCategoryName] = useState('');

  const setCategoryName = (text) => {
    setSubmitCategoryName(text);
    if (text.trim() != '') {
      setSubmitCategoryColor(Colors.green);
    } else {
      setSubmitCategoryColor(Colors.red);
    }
  };

  const selectCategory = () => {
    setHabitDetails({...habitDetails, category: 'test'});
    console.log('test');
    navigation.navigate('Main');
  };

  const loadCategories = () => {};

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectCategory} style={styles.categoryItem}>
        <Text style={styles.categoryText}>Placeholder Category</Text>
        <MCIcon
          style={styles.rightIcon}
          name="code-greater-than"
          color={'black'}
          size={26}
        />
      </TouchableOpacity>
      <View style={styles.categoryItem}>
        <MCIcon
          style={styles.categoryIcon}
          name="lead-pencil"
          color={'black'}
          size={26}
        />
        <TextInput
          placeholder="Category Name"
          onChangeText={setCategoryName}></TextInput>
        <TouchableOpacity
          style={styles.rightIcon}
          // onPress={() => navigation.navigate('ChooseCategoryIcon')}
        >
          <MCIcon
            name="arrow-right-bold-box-outline"
            color={submitCategoryColor}
            size={26}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    margin: 17,
  },
  categoryItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    marginBottom: 6,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  categoryIcon: {
    width: 35,
    height: 25,
  },
  categoryText: {
    margin: 38,
  },
  rightIcon: {
    marginLeft: 'auto',
  },
});

export default Category;
