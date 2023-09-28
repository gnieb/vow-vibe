import React, {FunctionComponent} from "react";
import styled from "styled-components/native";
import { Container } from "../shared";
import { colors } from "../colors";
import { StatusBar } from "expo-status-bar";

const HomeScreenContainer = styled(Container)`
background-color: ${colors.darkgreen};
width: 100%;
flex:1;
`

const HomeScreen: FunctionComponent = () => {
    return (
        <HomeScreenContainer>
            <StatusBar style="dark"/>
        </HomeScreenContainer>
    )
}

export default HomeScreen;