import { FunctionComponent } from "react";
import { TextProps } from "./types";
import { colors } from "../colors";
import styled from "styled-components/native";

const StyledText = styled.Text`
font-size: 13px;
color: ${colors.black};
text-align: left;
font-family: Helvetica;
`


const SmallText: FunctionComponent<TextProps> = ({children, textStyles}) => {
    return (
        <>
        <StyledText style={textStyles}>{children}</StyledText>
        </>
    )
}

export default SmallText;