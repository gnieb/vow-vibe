import React, {FunctionComponent} from "react";
import styled from "styled-components/native";
import {
    GestureResponderEvent,
    StyleProp,
    TextStyle,
    ViewStyle,
} from 'react-native'

import { colors } from "../colors";
import RegText from "../Texts/RegText";

const ButtonView = styled.TouchableOpacity`
align-items: center;
background-color: ${colors.mediumgreen};
width: 80%;
padding: 20px;
margin: 10px auto;
border-radius: 50px;
`

interface ButtonProps {
    btnStyles?: StyleProp<ViewStyle>;
    onPress : ((event: GestureResponderEvent) => void | undefined);
    textStyles?: StyleProp<TextStyle>;
    children: React.ReactNode;
}

const RegularButton: FunctionComponent<ButtonProps> = (props) => {
    return (
        <>
        <ButtonView onPress={props.onPress} style={props.btnStyles}>
            <RegText textStyles={props.textStyles}>{props.children}</RegText>
        </ButtonView>
        </>
    )
}

export default RegularButton