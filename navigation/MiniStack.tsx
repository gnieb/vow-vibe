import { FunctionComponent } from "react";
import { Text, View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import app screens
import Welcome from "../components/Screens/Welcome";
import Todos from "../components/Screens/Todos";
import HomeScreen from "../components/Screens/HomeScreen";
import Vision from "../components/Screens/Vision";
import Drawer from "./Drawer";
import GuestList from "../components/Screens/GuestList";
import type {RouteProp} from '@react-navigation/native';
import SignUp from "../components/Screens/SignUp";
import Login from "../components/Screens/Login";
import ChooseLoginOrSignup from "../components/Screens/ChooseLoginOrSignUp";
import { useState } from "react";


export type MiniStackParams = {
    SignUp: undefined;
    Login: undefined;
    ChooseLoginOrSignup: undefined;

}

const Stack = createNativeStackNavigator<MiniStackParams>();

const MiniStack:FunctionComponent = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
           
          }} 
           >
           {/* screens here  */}

           <Stack.Screen name="SignUp" component={SignUp} />
           <Stack.Screen name="Login" component={Login} />
           <Stack.Screen name="ChooseLoginOrSignup" component={ChooseLoginOrSignup}  />
        </Stack.Navigator>
    )
}

export default MiniStack;