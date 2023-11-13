import React, {FunctionComponent, useState,} from "react";
import { Text, StyleSheet, View, Pressable} from "react-native";
import RegularButton from "../Buttons/RegularButton";
import { Container } from "../shared";
import { colors } from "../colors";
import styled from "styled-components/native";
import DrawerOpener from "../../navigation/DrawerOpener";
import {  useAuth,  } from "../../context/AuthContext";
import DateTimePickerModal from 'react-native-modal-datetime-picker';


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

const API_URL = "http://192.168.1.14:5555"

const Profile:FunctionComponent = ({navigation}:any) => {
    const {onLogout, user} = useAuth()
    const [isEditWeddingShown, setIsEditWeddingShown] = useState<boolean>(false)
    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false)
    const [wedDate, setWedDate]= useState(new Date())

    const handleDateCancel = () => { 
        setDatePickerVisible(false); 
    }


    const postWedding = async (data:any) => {
            try {
                console.log(user)
                const resp = await fetch(`${API_URL}/weddings`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify(data)
            })
            return resp

        } catch (e) {
            return {error: true, msg:(e as any).response.data.msg}
        } 

    }

    const handleDateConfirm = (date:any) => { 
        // POST to database!
        
        // const newWed = {
        //     date: date,
        //     user_id: user.id
        // }
        // postWedding(newWed)
       
        // console.log(date)
        // example : 2023-11-24T15:19:00.000Z
        setWedDate(date); 
        setDatePickerVisible(false); 
    }; 

    const handleOpenDatePicker = () => {
        setDatePickerVisible(true)
    }

    const tryLoggingOut = async () => {
        await onLogout!()

        // if (result && result.error) {
        //     alert(result.msg)
        // }
    }

    // console.log(user?.weddings, user?.first_name, user?.last_name)


    return (
        <ProfileContainer>
            <DrawerOpener navigation={navigation} />
            {user? <Text style={profileStyles.textStyle}>{user.first_name}</Text>: null}
            <View>
         
            <RegularButton
                onPress={handleOpenDatePicker} 
                >
                <Text style={{color:"white"}}>Set a Date</Text>
            </RegularButton>
            <DateTimePickerModal 
                    isVisible={datePickerVisible} 
                    display="inline"
                    mode="datetime"
                    onConfirm={handleDateConfirm} 
                    onCancel={handleDateCancel} 
                /> 
            </View>
            <ButtonView
                onPress={() => tryLoggingOut()}
                >
                <Text style={{fontWeight:"bold", color:`${colors.darkgreen}`}}>LOG OUT</Text>
            </ButtonView>
            
            
        </ProfileContainer>
    )
}


const profileStyles = StyleSheet.create({
   
    
    textStyle: {
       fontSize: 20,
       fontWeight: 'bold',
       padding: 10,
       color:'white',
    }
})

export default Profile;