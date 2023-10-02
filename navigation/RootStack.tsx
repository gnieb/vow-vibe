import React, {FunctionComponent} from "react";
import Welcome from "../components/Screens/Welcome";
import HomeScreen from "../components/Screens/HomeScreen";
import { colors } from "../components/colors";
import Greeting from "../components/Headers/Greeting";
import Profile from "../components/Headers/Profile";
import avatar from "../assets/avatar1.png"
import Todos from "../components/Screens/Todos";

//React navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    Welcome: undefined;
    HomeScreen: undefined;
    Todos:undefined;
}

const RootStack: FunctionComponent = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator 
        screenOptions={{
            headerStyle: {
                backgroundColor: colors.darkgreen,
                borderBottomWidth: 0,
                shadowColor: "transparent",
                shadowOpacity : 0,
                elevation: 0,
                height: 120,
            },
            headerTintColor: colors.lightgreen,
            headerRightContainerStyle: {
                paddingRight:25,
                padding:10
            },
            headerLeftContainerStyle : {
                padding: 10,
            },
            headerRight: () => (
                <Profile img={avatar} imgContainerStyle={{backgroundColor:colors.mediumgreen}}/>
            ) ,
        }}
        initialRouteName="Todos"

        >
            <Stack.Screen 
            name="Welcome" 
            component={Welcome} 
            options={{headerShown: false}}/>
            <Stack.Screen 
            name="Todos"
            component={Todos}/>
            <Stack.Screen 
            name="HomeScreen" 
            component={HomeScreen} 
            options={{headerTitle:(props)=> ( 
                <Greeting
                mainText="Welcome HI!"
                subText="Take a deep breath."
                {...props} 
                />),
                headerLeft: () => <></>,
            }} 
            />
        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default RootStack;