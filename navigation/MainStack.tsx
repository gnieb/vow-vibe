import { FunctionComponent } from "react";
import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import app screens
import Welcome from "../components/Screens/Welcome";
import Todos from "../components/Screens/Todos";
import HomeScreen from "../components/Screens/HomeScreen";
import Vision from "../components/Screens/Vision";
import Drawer from "./Drawer";



import type {RouteProp} from '@react-navigation/native';

export type MainStackParamList = {
  Drawer: undefined;
  HomeScreen: undefined;
  Welcome: undefined;
  Todos: undefined;
  Vision:undefined;
};

// export type DetailsScreenRouteProp = RouteProp<MainStackParamList, 'Details'>;

//Stack will receive a mainStack Param List - (type)
const Stack = createNativeStackNavigator();

const MainStack:FunctionComponent = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
           
          }} 
           initialRouteName="Todos">
           {/* screens here  */}
           <Stack.Screen name="Drawer" component={Drawer} />
           <Stack.Screen name="Welcome" component={Welcome} />
           <Stack.Screen name="Home" component={HomeScreen}  />
           <Stack.Screen name="Todos" component={Todos} />
           <Stack.Screen name="Vision" component={Vision} />
        </Stack.Navigator>
    )
}

export default MainStack;