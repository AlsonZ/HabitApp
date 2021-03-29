import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Edit = React.memo(({color = 'white', size = 26}) => {
  return <Icon name="lead-pencil" color={color} size={size} />;
});

export default Edit;
