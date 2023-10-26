import React, {FunctionComponent} from "react";
import { Text, View } from "react-native";
import { Container } from "../shared";
import { colors } from "../colors";
import styled from "styled-components/native";
import DrawerOpener from "../../navigation/DrawerOpener";


const ProfileContainer = styled(Container)`
background-color: ${colors.darkgreen};
width: 100%;
flex:1;
`

const Profile:FunctionComponent = ({navigation}:any) => {
    return (
        <ProfileContainer>
            <DrawerOpener navigation={navigation} />
            <Text>PROFILE HERE</Text>
        </ProfileContainer>
    )
}

export default Profile;