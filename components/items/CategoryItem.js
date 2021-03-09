import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DefaultColors} from '../settings/Colors';
import {CategoriesContext} from '../contexts/CategoriesContext';
import {deleteCategory, storeNewCategory} from '../settings/Storage';
import DeleteModal from '../modal/DeleteModal';
import CategoryListItem from './CategoryListItem';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const CategoryItem = ({route, navigation}) => {
  const [categories, setCategories, reloadContext] = useContext(
    CategoriesContext,
  );
  const {selectedCategory, parentRoute} = route.params;
  const [categoryColor, setCategoryColor] = useState(DefaultColors.red);
  const [categoryName, setCategoryName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');

  const onCategoryNameChange = (text) => {
    setCategoryName(text);
    if (text.trim() != '') {
      setCategoryColor(DefaultColors.green);
    } else {
      setCategoryColor(DefaultColors.red);
    }
  };

  const createCategory = async () => {
    if (categoryName.trim() !== '') {
      // setCategories([...categories, {name: categoryName}]);
      await storeNewCategory({name: categoryName, id: uuidv4()});
      reloadContext();
      setCategoryName('');
    }
  };

  const selectCategory = (category) => {
    navigation.navigate(parentRoute, {
      category: category,
    });
  };

  const loadCategories = () => {
    if (categories) {
      return categories.map(({name}, index) => (
        <CategoryListItem
          category={name}
          key={index}
          selectCategory={selectCategory}
          deleteCategory={(category) => {
            setCurrentCategory(category);
            setModalVisible();
          }}
        />
      ));
    }
  };

  const deleteCategoryItem = async () => {
    const success = await deleteCategory(currentCategory);
    if (success === 'Success') {
      reloadContext();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <DeleteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={`Delete ${currentCategory}?`}
        onPress={deleteCategoryItem}
      />
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
        <TouchableOpacity style={styles.rightIcon} onPress={createCategory}>
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
    padding: 17,
    marginRight: 1,
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
    flex: 1,
  },
  selectedCategory: {
    backgroundColor: 'lightblue',
  },
});

export default CategoryItem;
