import React, { FunctionComponent } from "react"
import { SafeAreaView, View, Text, ImageBackground, StyleSheet } from "react-native"
import RegularButton from "../Buttons/RegularButton"
import NewUser from "../NewUser"
import styled from "styled-components/native"
import { colors } from "../colors"

import chair from '../../assets/vowVibephotos/flowersInChair.jpg'



interface Props {
    navigation: any
}

const ScreenContainer = styled.View`
background-color: ${colors.darkgreen};
width: 100%;
flex:1;
justify-content:center;
`

const ChooseContainer = styled.View`
width:100%;
`

const ChooseLoginOrSignup:FunctionComponent<Props> = ({navigation}) => {
    return (
        <ScreenContainer>
            <ImageBackground
            source={chair}
            style={styles.image}
            resizeMode="cover"
            >
            <ChooseContainer>
                <RegularButton
                btnStyles={{"backgroundColor":"white"}}
                onPress={() => navigation.navigate('SignUp')}
                textStyles={{fontWeight:"bold", color:`${colors.darkgreen}`}}
                >CREATE ACCOUNT
                </RegularButton>
                <RegularButton
                onPress={() => navigation.navigate('Login')}
                btnStyles={{"backgroundColor":"white"}}
                textStyles={{fontWeight:"bold", color:`${colors.darkgreen}`}}
                >LOG IN
                </RegularButton>
            </ChooseContainer>
            </ImageBackground>
        </ScreenContainer>
            
      
    )
}

export default ChooseLoginOrSignup;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    text: {
      color: 'white',
      fontSize: 42,
      lineHeight: 84,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#000000c0',
    },
  });