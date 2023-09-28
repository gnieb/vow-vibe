import React, {FunctionComponent} from 'react';
import { colors } from '../colors';
import { Container } from '../shared';
import styled from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import SmallText from '../Texts/SmallText';
import RegText from '../Texts/RegText';
import RegularButton from '../Buttons/RegularButton';

const WelcomeContainer = styled(Container)`
background-color: ${colors.primary};
justify-content: space-between;
height: 100%;
width: 100%;
`

const TopSection = styled.View`
width: 100%;
flex: 1;
max-height: 60%;
background-color: pink;
`

const TopImage = styled.Image`
height:100%;
width: 100%;
resize-mode: stretch;
`


const BottomSection = styled.View`
width: 100%;
flex: 1;
padding: 25px;
`

import rings from "../../assets/ringsrecord.jpg"
import BigText from '../Texts/BigText';

const Welcome: FunctionComponent = () => {
    return (
        <>
        <StatusBar style="light"/>
        <WelcomeContainer>
            <TopSection>
                <TopImage source={rings} />
            </TopSection>
            <BottomSection>
                <BigText>PLACEHOLDER FOR A COUNTDOWN</BigText>
                <RegText>You've waited forever for this day. Let's make it perfect.</RegText>
                <RegularButton onPress={()=>{}} >GET STARTED</RegularButton>
            </BottomSection>
        </WelcomeContainer>
        </>
    )
}

export default Welcome;