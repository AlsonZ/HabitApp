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
import ModalItem from '../modal/ModalItem';
import CategoryListItem from './CategoryListItem';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const CategoryItem = ({route, navigation}) => {
  const [categories, setCategories, reloadContext] = useContext(
    CategoriesContext,
  );
  const {selectedCategory, parentRoute} = route.params;
  const [categoryColor, setCategoryColor] = useState(Colors.red);
  const [categoryName, setCategoryName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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
          // deleteCategory={}
        />
      ));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ModalItem
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'Delete Category?'}
        modalHeader={true}
        modalFooter={true}>
        <View></View>
      </ModalItem>
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
