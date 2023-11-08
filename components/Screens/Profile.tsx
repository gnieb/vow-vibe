import React, {FunctionComponent, useState} from "react";
import { Text} from "react-native";
import { Container } from "../shared";
import { colors } from "../colors";
import styled from "styled-components/native";
import DrawerOpener from "../../navigation/DrawerOpener";
import {  useAuth,  } from "../../context/AuthContext";
import NewWedding from "../NewWedding";



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
    const {onLogout, user} = useAuth()

    const [isFormVisible, setIsFormVisible] = useState<boolean>(false)

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
                onPress={()=> setIsFormVisible(!isFormVisible)}
                >
                <Text style={{fontWeight:"bold", color:`${colors.darkgreen}`}}>Add Wedding info</Text>
            </ButtonView>
            {isFormVisible ? 
                <NewWedding /> : null
            }
            <ButtonView
                onPress={() => tryLoggingOut()}
                >
                <Text style={{fontWeight:"bold", color:`${colors.darkgreen}`}}>LOG OUT</Text>
            </ButtonView>
            <Text>PROFILE HERE</Text>
            {user? <Text>{user.first_name}</Text>: null}
        </ProfileContainer>
    )
}

export default Profile;