import { SafeAreaView, Text, View } from "react-native"
import React, {FunctionComponent} from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const RootNav:FunctionComponent = () => {
    return (
        <NavigationContainer>
            <Text>ROOT NAV</Text>
        </NavigationContainer>
    )
}

export default RootNav;



{/* <Drawer.Navigator>
            <Drawer.Screen name="Welcome" component={Welcome} />
            <Drawer.Screen name="ToDos" component={Todos} />
</Drawer.Navigator> */}