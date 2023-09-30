import React, {FunctionComponent} from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { Container } from "../shared";
import RegText from "../Texts/RegText";
import LinkButton from "../Buttons/LinkButton";

import { StyleProp, ViewStyle, GestureResponderEvent, TextStyle } from "react-native";

const RegistryContainer = styled(Container)`
background-color: ${colors.lightgreen};
width: 100%;
height:100%;
flex:1;
`

const MainSection = styled.View`
margin: auto;
`


const Registry: FunctionComponent = () => {
    return (
        <RegistryContainer>
            <MainSection>
                <RegText>Go to Wedding Registry</RegText>
                <LinkButton  />
            </MainSection>
        </RegistryContainer>
    )
}

export default Registry;