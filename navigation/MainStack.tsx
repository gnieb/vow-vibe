import { FunctionComponent } from "react";
import { Text, View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import app screens
import Todos from "../components/Screens/Todos";
import HomeScreen from "../components/Screens/HomeScreen";
import Vision from "../components/Screens/Vision";
import Drawer from "./Drawer";
import GuestList from "../components/Screens/GuestList";
import { useState } from "react";
import Profile from "../components/Screens/Profile";

export type MainStackParamList = {
  Drawer: undefined;
  HomeScreen: undefined;
  Todos: undefined;
  Vision:undefined;
  GuestList:undefined;
  Profile: undefined;
};

// export type DetailsScreenRouteProp = RouteProp<MainStackParamList, 'Details'>;

//Stack will receive a mainStack Param List - (type)
const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack:FunctionComponent = () => {

  const [isOpen, setIsOpen] = useState(false)

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
          }} 
          //  initialRouteName="GuestList"
           >
           {/* screens here  */}
           <Stack.Screen name="Drawer" component={Drawer} />
           <Stack.Screen name="HomeScreen" component={HomeScreen}  />
           <Stack.Screen name="Todos" component={Todos} />
           {/* <Stack.Screen name="Vision" component={Vision} /> */}
           <Stack.Screen name="GuestList" component={GuestList} />
           <Stack.Screen name="Profile" component= {Profile} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({});

export default MainStack;