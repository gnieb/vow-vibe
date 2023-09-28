import React, {FunctionComponent} from "react";
import Welcome from "../components/Screens/Welcome";
import HomeScreen from "../components/Screens/HomeScreen";
import { colors } from "../components/colors";

//React navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    Welcome: undefined;
    HomeScreen: undefined;

}

const RootStack: FunctionComponent = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator 
        screenOptions={{
            headerStyle: {
                backgroundColor: colors.lightgreen,
                borderBottomWidth: 0,
                shadowColor: "transparent",
                shadowOpacity : 0,
                elevation: 0,
                height: 120,
            }
        }}
        initialRouteName="HomeScreen"

        >
            <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}} />
        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default RootStack;