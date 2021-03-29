import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Gear = React.memo(({color = 'white', size = 26}) => {
  return <Icon name="gear" color={color} size={size} />;
});

export default Gear;
