import { FunctionComponent } from "react";
import { TextProps } from "./types";
import { colors } from "../colors";
import styled from "styled-components/native";

const StyledText = styled.Text`
font-size: 37px;
color: ${colors.black};
text-align: center;
font-family: Roboto-bold;
margin-bottom: 20px;
`


const BigText: FunctionComponent<TextProps> = ({children, textStyles}) => {
    return (
        <>
        <StyledText style={textStyles}>{children}</StyledText>
        </>
    )
}

export default BigText;