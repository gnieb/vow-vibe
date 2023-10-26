import React, { FunctionComponent } from "react"
import { Dimensions, SafeAreaView, View, Text, ImageBackground, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
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

const ScrollContainer = styled.ScrollView`
width: 100%;
flex:1;

`
// justify-content:center;


const FormContainer = styled.View`
align-items:center;
width:100%;
`

const ButtonView = styled.TouchableOpacity`
align-items: center;
background-color: white;
width: 30%;
padding: 10px;
margin-top: 50px;
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
        <ScrollContainer
        automaticallyAdjustKeyboardInsets={true}>
         <ButtonView
                onPress={() => navigation.navigate('Login')}
          
                >
            <Text style={styles.buttonText}>LOG IN</Text>
        </ButtonView>
        
        <FormContainer>
            <NewUser />
        </FormContainer>
        </ScrollContainer>
    </ImageBackground>
    </ScreenContainer>

)
}

export default SignUp;

const styles = StyleSheet.create({
    image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
      flex: 1,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right:0,
      zIndex:-1
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