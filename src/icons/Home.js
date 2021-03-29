import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = React.memo(({color = 'white', size = 26}) => {
  return <Icon name="home" color={color} size={size} />;
});

export default Home;
