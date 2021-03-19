import React, {createContext, useEffect, useState} from 'react';
import {getAllCategories, storeNewCategory} from '../storage/Storage';

export const CategoriesContext = createContext();

export const CategoriesProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    let loading = false;
    const getData = async () => {
      loading = true;
      const categoriesData = await getAllCategories();
      console.log('This is categories');
      console.log(categoriesData);
      setCategories(categoriesData);
      loading = false;
    };
    if (!loading) {
      getData();
    }
  }, [reload]);

  const reloadContext = () => {
    setReload(!reload);
  };

  return (
    <CategoriesContext.Provider
      value={[categories, setCategories, reloadContext]}>
      {props.children}
    </CategoriesContext.Provider>
  );
};
