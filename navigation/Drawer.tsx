import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

//screens import
import HomeScreen from '../components/Screens/HomeScreen';
import Welcome from '../components/Screens/Welcome';
import Vision from '../components/Screens/Vision';
import Todos from '../components/Screens/Todos';
import GuestList from '../components/Screens/GuestList';
import Profile from '../components/Screens/Profile';
import { useWindowDimensions } from 'react-native';



const Drawer = () => {

  const dimensions = useWindowDimensions()
  const isLargeScreen = dimensions.width >= 768;

  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
    screenOptions={{
      drawerType: isLargeScreen ? 'permanent' : 'slide',
      drawerStyle: {
        backgroundColor: '#c6cbef',
        width: 240,
      },
      headerShown:false
    }}  >
      {/* Drawer Screens here */}
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Welcome" component={Welcome} />
      <Drawer.Screen name="Vision" component={Vision} />
      <Drawer.Screen name="Todos" component={Todos} />
      <Drawer.Screen name="GuestList" component={GuestList} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default Drawer;