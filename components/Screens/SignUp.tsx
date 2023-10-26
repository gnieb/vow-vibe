import React, { FunctionComponent } from "react"
import { SafeAreaView, View, Text, ImageBackground, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import NewUser from "../NewUser"
import styled from "styled-components/native"
import { colors } from "../colors"
import chair from '../../assets/vowVibephotos/flowersInChair.jpg'
import RegularButton from "../Buttons/RegularButton"



const ScreenContainer = styled.View`
width: 100%;
flex:1;
justify-content:center;
`

const FormContainer = styled.View`
align-items:center;
width:100%;
`

const ButtonView = styled.TouchableOpacity`
align-items: center;
background-color: white;
width: 30%;
padding: 10px;
margin-top: 40px;
margin-left:10px;
border-radius: 50px;
`

const SignUp:FunctionComponent = ({navigation}:any) => {
return (
    <ScreenContainer>
    <ImageBackground
    source={chair}
    style={styles.image}
    resizeMode="cover"
    >
         <ButtonView
                onPress={() => navigation.navigate('Login')}
          
                >
            <Text style={styles.buttonText}>LOG IN</Text>
        </ButtonView>
        
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
      buttonText: {
        color: `${colors.darkgreen}`,
        fontSize: 20,
        textAlign: 'center',
      },
  });