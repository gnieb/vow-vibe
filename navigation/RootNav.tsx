import { SafeAreaView, Text, View } from "react-native"
import React, {FunctionComponent} from "react"
import { NavigationContainer } from "@react-navigation/native"
import MainStack from "./MainStack";


const RootNav:FunctionComponent = () => {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    )
}

const NotAuthenticatedYet: FunctionComponent = () => {
    return (
        <NavigationContainer>
            <MiniStack />
        </NavigationContainer>
    )
}

export default RootNav;



{/* <Drawer.Navigator>
            <Drawer.Screen name="Welcome" component={Welcome} />
            <Drawer.Screen name="ToDos" component={Todos} />
</Drawer.Navigator> */}