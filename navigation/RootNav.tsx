import { SafeAreaView, Text, View } from "react-native"
import React, {FunctionComponent} from "react"
import { NavigationContainer } from "@react-navigation/native"
import MainStack from "./MainStack";
import MiniStack from "./MiniStack";


export const RootNav:FunctionComponent = () => {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    )
}

export const MiniRootNav: FunctionComponent = () => {
    return (
        <NavigationContainer>
            <MiniStack />
        </NavigationContainer>
    )
}



{/* <Drawer.Navigator>
            <Drawer.Screen name="Welcome" component={Welcome} />
            <Drawer.Screen name="ToDos" component={Todos} />
</Drawer.Navigator> */}