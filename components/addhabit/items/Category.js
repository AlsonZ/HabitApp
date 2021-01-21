import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../settings/Colors';
import {CategoriesContext} from '../../contexts/CategoriesContext';
import {AddHabitContext} from '../../contexts/AddHabitContext';

const Category = ({navigation}) => {
  const [categories, setCategories] = useContext(CategoriesContext);
  const [habitDetails, setHabitDetails] = useContext(AddHabitContext);

  const [categoryColor, setCategoryColor] = useState(Colors.red);
  const [categoryName, setCategoryName] = useState('');

  const onCategoryNameChange = (text) => {
    setCategoryName(text);
    if (text.trim() != '') {
      setCategoryColor(Colors.green);
    } else {
      setCategoryColor(Colors.red);
    }
  };

  const createCategory = () => {
    console.log(categoryName);
    if (categoryName.trim() != '') {
      setCategories([...categories, {name: categoryName}]);
      setCategoryName('');
    }
  };

  const selectCategory = (category) => {
    setHabitDetails({...habitDetails, category: category});
    console.log('test');
    navigation.navigate('Main');
  };

  const CategoryListItem = ({category}) => {
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

  const loadCategories = () => {
    if (categories) {
      return categories.map(({name}) => <CategoryListItem category={name} />);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {loadCategories()}
      <View style={styles.categoryItem}>
        <MCIcon
          style={styles.categoryIcon}
          name="lead-pencil"
          color={'black'}
          size={26}
        />
        <TextInput
          placeholder="Category Name"
          onChangeText={onCategoryNameChange}
          onSubmitEditing={createCategory}
          value={categoryName}
          style={styles.textInput}></TextInput>
        <TouchableOpacity
          style={styles.rightIcon}
          // onPress={() => navigation.navigate('ChooseCategoryIcon')}
          onPress={createCategory}>
          <MCIcon
            name="arrow-right-bold-box-outline"
            color={categoryColor}
            size={26}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // justifyContent: 'center',
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
  textInput: {
    width: '60%',
  },
});

export default Category;
