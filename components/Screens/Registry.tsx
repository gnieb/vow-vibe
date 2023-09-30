import React, {FunctionComponent} from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { Container } from "../shared";
import RegText from "../Texts/RegText";
import { Link } from "@react-navigation/native";

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

interface LinkProps {
    src:string
    btnStyles?: StyleProp<ViewStyle>;
    // onPress : ((event: GestureResponderEvent) => void | undefined);
    textStyles?: StyleProp<TextStyle>;
    children: React.ReactNode;
}

const RegistryLink: FunctionComponent<LinkProps> = (props) => {
    return <Link to={props.src}>{props.children}</Link>
}


const Registry: FunctionComponent = () => {
    return (
        <RegistryContainer>
            <MainSection>
                <RegText>Go to Wedding Registry</RegText>
                <RegistryLink  />
            </MainSection>
        </RegistryContainer>
    )
}

export default Registry;