import { FunctionComponent } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import app screens
import SignUp from "../components/Screens/SignUp";
import Login from "../components/Screens/Login";
import ChooseLoginOrSignup from "../components/Screens/ChooseLoginOrSignUp";
import { MiniDrawer } from "./MiniDrawer";



export type MiniStackParams = {
    SignUp: undefined;
    Login: undefined;
    ChooseLoginOrSignup: undefined;
    MiniDrawer: undefined;
}

const Stack = createNativeStackNavigator<MiniStackParams>();

const MiniStack:FunctionComponent = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
           
          }} 
           >
           {/* screens here  */}
          <Stack.Screen name="MiniDrawer" component={MiniDrawer} />
           <Stack.Screen name="SignUp" component={SignUp} />
           <Stack.Screen name="Login" component={Login} />
           <Stack.Screen name="ChooseLoginOrSignup" component={ChooseLoginOrSignup}  />
        </Stack.Navigator>
    )
}

export default MiniStack;