import React, {FunctionComponent} from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { StyleProp, TextStyle, } from "react-native";

import SmallText from "../Texts/SmallText";
import RegText from "../Texts/RegText";

interface GreetingProps {
    mainText: string;
    subText: string;
    mainTextStyles?: StyleProp<TextStyle>;
    subTextStyles?: StyleProp<TextStyle>;
}

const StyledView = styled.View`
    flex-direction: column;
    flex:1;
    justify-content: center;
`


const Greeting: FunctionComponent<GreetingProps> = (props) => {
    return (
        <StyledView>
            <RegText textStyles={[{
                color:colors.primary,
                fontSize: 22,
            }, 
            props.mainTextStyles
            ]}>{props.mainText}</RegText>
            <SmallText
            textStyles={{
                color:colors.lightgreen
            }}
            >{props.subText}</SmallText>
        </StyledView>
    )
}

export default Greeting;