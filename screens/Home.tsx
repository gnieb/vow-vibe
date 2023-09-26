import React, {FunctionComponent} from 'react';
import { colors } from '../components/colors';
import { Container } from '../components/shared';
import styled from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import SmallText from '../Texts/SmallText';

const HomeContainer = styled(Container)`
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

import rings from "../assets/ringsrecord.jpg"
import BigText from '../Texts/BigText';

const Home: FunctionComponent = () => {
    return (
        <>
        <StatusBar style="light"/>
        <HomeContainer>
            <TopSection>
                <TopImage source={rings} />
            </TopSection>
            <BottomSection>
                <BigText>Welcome to VowVibe</BigText>
              <SmallText>You've waited for this day for forever. Let's make it perfect.</SmallText>
            </BottomSection>
        </HomeContainer>
        </>
    )
}

export default Home;