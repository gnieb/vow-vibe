import { SafeAreaView, Text, View } from "react-native"
import React, {FunctionComponent} from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainStack from "./MainStack";

const Drawer = createDrawerNavigator();

const RootNav:FunctionComponent = () => {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    )
}

export default RootNav;



{/* <Drawer.Navigator>
            <Drawer.Screen name="Welcome" component={Welcome} />
            <Drawer.Screen name="ToDos" component={Todos} />
</Drawer.Navigator> */}