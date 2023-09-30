import React, {FunctionComponent} from "react";
import { Link } from "@react-navigation/native";
import styled from "styled-components/native";
import { colors } from "../colors";
import RegText from "../Texts/RegText";
import { 
    StyleProp, 
    ViewStyle, 
    GestureResponderEvent, 
    TextStyle } from "react-native";

    const LinkView = styled.TouchableOpacity`
    align-items: center;
    background-color: ${colors.lightgreen};
    width: 80%;
    padding: 20px;
    margin: 10px auto;
    border-radius: 50px;
    `

interface LinkProps {
    src:string
    btnStyles?: StyleProp<ViewStyle>;
    // onPress : ((event: GestureResponderEvent) => void | undefined);
    textStyles?: StyleProp<TextStyle>;
    children: React.ReactNode;
}
    
const LinkButton: FunctionComponent<LinkProps> = (props) => {
    return (
    <LinkView style={props.btnStyles}>
        <Link to={props.src}>
            <RegText textStyles={props.textStyles}>{props.children}</RegText>
        </Link>
    </LinkView>
    )
}

export default LinkButton;