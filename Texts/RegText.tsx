import { FunctionComponent } from "react";
import { TextProps } from "./types";
import { colors } from "../components/colors";
import styled from "styled-components/native";

const StyledText = styled.Text`
font-size: 20px;
color: ${colors.black};
text-align: left;
font-family: Roboto-reg;
`


const RegText: FunctionComponent<TextProps> = ({children, textStyles}) => {
    return (
        <>
        <StyledText style={textStyles}>{children}</StyledText>
        </>
    )
}

export default RegText;