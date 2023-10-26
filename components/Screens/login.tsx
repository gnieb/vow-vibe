import { StatusBar } from 'expo-status-bar';
import { FunctionComponent } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import DrawerOpener from '../../navigation/DrawerOpener';
import styled from 'styled-components/native';
import { colors } from '../colors';

const ScreenContainer = styled.View`
background-color: ${colors.darkgreen};
width: 100%;
flex:1;
justify-content:center;
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
        <View>
        <Text style={styles.text}>LOG IN WILL BE HERE</Text>
        </View>
      </ImageBackground>
      
     
    </ScreenContainer>
  );
}

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
  },
});

export default Login;