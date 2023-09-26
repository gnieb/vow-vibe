import { FunctionComponent } from "react";
import { TextProps } from "./types";
import { colors } from "../components/colors";
import styled from "styled-components/native";

const StyledText = styled.Text`
font-size: 13px;
color: ${colors.mediumgreen};
text-align: left;
font-family: Roboto-Regular;
`


const SmallText: FunctionComponent<TextProps> = ({children, textStyles}) => {
    return (
        <>
        
        </>
    )
}