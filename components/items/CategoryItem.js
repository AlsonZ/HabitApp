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
import {DefaultColors as Colors} from '../settings/Colors';
import {CategoriesContext} from '../contexts/CategoriesContext';
import {storeNewCategory} from '../settings/Storage';

const CategoryItem = ({route, navigation}) => {
  const [categories, setCategories, reloadContext] = useContext(
    CategoriesContext,
  );
  const {selectedCategory, parentRoute} = route.params;
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

  const createCategory = async () => {
    if (categoryName.trim() !== '') {
      // setCategories([...categories, {name: categoryName}]);
      await storeNewCategory({name: categoryName});
      reloadContext();
      setCategoryName('');
    }
  };

  const selectCategory = (category) => {
    navigation.navigate(parentRoute, {
      category: category,
    });
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
      return categories.map(({name}, index) => (
        <CategoryListItem category={name} key={index} />
      ));
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
    margin: 17,
    marginRight: 1,
  },
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
  selectedCategory: {
    backgroundColor: 'lightblue',
  },
});

export default CategoryItem;
