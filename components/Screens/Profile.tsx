import React, {FunctionComponent} from "react";
import { Text, View } from "react-native";
import { Container } from "../shared";
import { colors } from "../colors";
import styled from "styled-components/native";
import DrawerOpener from "../../navigation/DrawerOpener";
import { TouchableHighlight } from "react-native-gesture-handler";
import {  useAuth } from "../../context/AuthContext";


const ProfileContainer = styled(Container)`
background-color: ${colors.darkgreen};
width: 100%;
flex:1;
`

const Profile:FunctionComponent = ({navigation}:any) => {
    const {onLogout} = useAuth()


    return (
        <ProfileContainer>
            <DrawerOpener navigation={navigation} />
            <TouchableHighlight onPress={() => onLogout}>
                LOGOUT 
            </TouchableHighlight>
            <Text>PROFILE HERE</Text>
        </ProfileContainer>
    )
}

export default Profile;