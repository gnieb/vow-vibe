import React, {FunctionComponent} from "react";
import { Text, View, Button } from "react-native";
import { Container } from "../shared";
import { colors } from "../colors";
import styled from "styled-components/native";
import DrawerOpener from "../../navigation/DrawerOpener";
import {  useAuth } from "../../context/AuthContext";
import { TouchableOpacity } from "react-native";
import RegularButton from "../Buttons/RegularButton";

const ProfileContainer = styled(Container)`
background-color: ${colors.darkgreen};
width: 100%;
flex:1;
justify-content:center;
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

const Profile:FunctionComponent = ({navigation}:any) => {
    const {onLogout} = useAuth()

    const tryLoggingOut = async () => {
        await onLogout!()
        // if (result && result.error) {
        //     alert(result.msg)
        // }
    }


    return (
        <ProfileContainer>
            <DrawerOpener navigation={navigation} />
            <ButtonView
                onPress={() => tryLoggingOut()}
                >
                <Text style={{fontWeight:"bold", color:`${colors.darkgreen}`}}>LOG OUT</Text>
            </ButtonView>
            <Text>PROFILE HERE</Text>
        </ProfileContainer>
    )
}

export default Profile;