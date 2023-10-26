import React, { FunctionComponent } from "react"
import { SafeAreaView, View, Text, ImageBackground, StyleSheet } from "react-native"
import NewUser from "../NewUser"
import styled from "styled-components/native"
import { colors } from "../colors"
import chair from '../../assets/vowVibephotos/flowersInChair.jpg'


const ScreenContainer = styled.View`
width: 100%;
flex:1;
justify-content:center;
`

const FormContainer = styled.View`
align-items:center;
width:100%;
`

const SignUp:FunctionComponent = ({navigation}:any) => {
return (
    <ScreenContainer>
    <ImageBackground
    source={chair}
    style={styles.image}
    resizeMode="cover"
    >
        <FormContainer>
            <NewUser />
        </FormContainer>
    </ImageBackground>
    </ScreenContainer>
)
}

export default SignUp;

const styles = StyleSheet.create({
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
      },
  });