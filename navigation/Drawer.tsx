import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

//screens import
import HomeScreen from '../components/Screens/HomeScreen';
import Welcome from '../components/Screens/Welcome';
import Vision from '../components/Screens/Vision';
import Todos from '../components/Screens/Todos';
import GuestList from '../components/Screens/GuestList';


const Drawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      {/* Drawer Screens here */}
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="Welcome" component={Welcome} />
      <Drawer.Screen name="Vision" component={Vision} />
      <Drawer.Screen name="Todos" component={Todos} />
      <Drawer.Screen name="GuestList" component={GuestList} />
    </Drawer.Navigator>
  );
};

export default Drawer;