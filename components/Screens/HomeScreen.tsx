import React, {FunctionComponent} from "react";
import styled from "styled-components/native";
import { Container } from "../shared";
import { colors } from "../colors";
import { StatusBar } from "expo-status-bar";
import DrawerOpener from "../../navigation/DrawerOpener";

const HomeScreenContainer = styled(Container)`
background-color: ${colors.darkgreen};
width: 100%;
flex:1;
`

const HomeScreen: FunctionComponent = ({navigation}:any) => {
    return (
        <>
        <DrawerOpener navigation={navigation} />
        <HomeScreenContainer>
            <StatusBar style="light"/>
        </HomeScreenContainer>
        </>
    )
}

export default HomeScreen;