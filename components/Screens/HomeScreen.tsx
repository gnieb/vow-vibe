import React, {FunctionComponent} from 'react';
import { colors } from '../colors';
import { Container } from '../shared';
import styled from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import RegText from '../Texts/RegText';
import DrawerOpener from '../../navigation/DrawerOpener';
import Countdown from '../Countdown';

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
justify-content:center;
`

const ScreenView = styled.View`
height:100%;
width: 100%;
position:relative;
z-index:1;
`

import rings from "../../assets/ringsrecord.jpg"

const Welcome: FunctionComponent = ({navigation}:any) => {
    return (
        <ScreenView>
        <DrawerOpener navigation={navigation} />
        <StatusBar style="light"/>
        <WelcomeContainer>
            <TopSection>
                <TopImage source={rings} />
            </TopSection>
            <BottomSection>
                <RegText>You've waited forever for this day. Let's make it perfect.</RegText>
                <Countdown  />
            </BottomSection>
        </WelcomeContainer>
        </ScreenView>
    )
}





export default Welcome;