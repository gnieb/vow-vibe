import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SignUp from '../components/Screens/SignUp';
import Login from '../components/Screens/Login';
import { useWindowDimensions } from 'react-native';



export const MiniDrawer = () => {
    const Drawer = createDrawerNavigator();
    const dimensions = useWindowDimensions()
    const isLargeScreen = dimensions.width >= 768;
    
    return(
        <Drawer.Navigator
        screenOptions={{
            drawerType: isLargeScreen ? 'permanent' : 'slide',
            drawerStyle: {
              backgroundColor: '#c6cbef',
              width: 240,
            },
            headerShown:false
          }} >
            <Drawer.Screen name="SignUp" component={SignUp} />
            <Drawer.Screen name="Login" component={Login} />
        </Drawer.Navigator>

    )
}