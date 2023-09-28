import React, {FunctionComponent} from "react";
import Welcome from "../components/Screens/Welcome";

//React navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

export type RootStackParamList = {
    Home: undefined;
}

const RootStack = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator>
             <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default RootStack;