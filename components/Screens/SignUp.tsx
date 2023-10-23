import React, { FunctionComponent } from "react"
import { SafeAreaView, View, Text } from "react-native"
import NewUser from "../NewUser"
import styled from "styled-components/native"
import { colors } from "../colors"
import { Container } from "../shared"
import { StatusBar } from "expo-status-bar";
import DrawerOpener from "../../navigation/DrawerOpener"

const SignUpContainer = styled(Container)`
background-color: ${colors.darkgreen};
width: 100%;
flex:1;
`

const SignUp:FunctionComponent = ({navigation}:any) => {
return (
    <>
    <DrawerOpener navigation={navigation}/>
    <SignUpContainer>
        <StatusBar style="auto"/>
        <NewUser />
    </SignUpContainer>
    </>
)
}

export default SignUp;