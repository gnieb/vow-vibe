import React, { FunctionComponent } from "react"
import { SafeAreaView, View, Text, } from "react-native"
import RegularButton from "../Buttons/RegularButton"
import NewUser from "../NewUser"
import styled from "styled-components/native"
import { colors } from "../colors"
import { Container } from "../shared"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



interface Props {
    navigation: any
}

const ChooseLoginOrSignup:FunctionComponent<Props> = ({navigation}) => {
    return (
        <SafeAreaView>
            <Text>First Time? Create your account today!</Text>
            <RegularButton
            onPress={() => navigation.navigate('SignUp')}
            >Create Account
            </RegularButton>
        </SafeAreaView>
    )
}

export default ChooseLoginOrSignup;