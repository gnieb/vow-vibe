import { FunctionComponent, } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../colors';
import ReturnUser from './ReturnUser';


const ScreenContainer = styled.View`
background-color: ${colors.darkgreen};
width: 100%;
flex:1;
justify-content:center;
`

const ScrollContainer = styled.ScrollView`
width: 100%;
flex:1;

`

const FormContainer = styled.View`
align-items:center;
width:100%;
`

const ButtonView = styled.TouchableOpacity`
align-items: center;
background-color: white;
width: 40%;
padding: 10px;
margin-top: 50px;
margin-left:10px;
border-radius: 50px;
`

import chair from '../../assets/vowVibephotos/flowersInChair.jpg'

const Login:FunctionComponent = ({navigation}:any) => {
  return (
    <ScreenContainer>
      <ImageBackground
      source={chair}
      style={styles.image}
      resizeMode="cover"
      >
        <ScrollContainer>
          <ButtonView
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
          </ButtonView>
          <View>
            <ReturnUser />
          </View>
        </ScrollContainer>
      </ImageBackground>
    </ScreenContainer>
  );
}

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
      fontSize: 15,
      textAlign: 'center',
    },
});

export default Login;