import React, {FunctionComponent, useState, useEffect} from "react";
import { Text, StyleSheet, View, Pressable} from "react-native";
import RegularButton from "../Buttons/RegularButton";
import { Container } from "../shared";
import { colors } from "../colors";
import styled from "styled-components/native";
import DrawerOpener from "../../navigation/DrawerOpener";
import {  useAuth,  } from "../../context/AuthContext";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { API_URL } from "../../assets/API";


const ProfileContainer = styled(Container)`
background-color: ${colors.darkgreen};
width: 100%;
flex:1;
justify-content: between;
`

const Profile:FunctionComponent = ({navigation}:any) => {
    const {onLogout, user, setUser} = useAuth()
    const [isEditWeddingShown, setIsEditWeddingShown] = useState<boolean>(false)
    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false)
    const [wedDate, setWedDate] = useState(new Date())
    const [showWedding, setshowWedding]= useState<Wedding[]>([])

    const handleDateCancel = () => { 
        setDatePickerVisible(false); 
    }

    console.log("user:", user)

    const postWedding = async (data:any) => {
            try {
                const resp = await fetch(`${API_URL}/weddings`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify(data)
            })
            console.log("successfully created new wedding date!")
            
            return resp

        } catch (e) {
            return {error: true, msg:(e as any).response.data.msg}
        } 
    }

    const handleDateConfirm = (date:any) => { 
        // POST to database!
        const newWed = {
            wedding_date: date,
            user_id: user?.id
        }
        postWedding(newWed)
        console.log("date passed into handleDateConfirm:",date)
        // example : 2023-11-24T15:19:00.000Z
        setWedDate(date); 
        setDatePickerVisible(false); 
    }; 

    const handleOpenDatePicker = () => {
        setDatePickerVisible(true)
    }

    const tryLoggingOut = async () => {
        await onLogout!()
    }

    useEffect(() => {
        const getWedding = async () => {
            try {
                const result = await fetch(`${API_URL}/users/${user?.id}`)
                const data = await result.json()
                
                console.log("This is the getWeddings useEffect:", data.wedding)
                setshowWedding(data.wedding)

            } catch (e) {
                console.log("Error during reuqest for user info", "e:", e)
                return {error: true, msg:(e as any).response.data.msg}
            }
        }
        getWedding()
    }, [])

    // console.log(user?.weddings, user?.first_name, user?.last_name)
    console.log("user:", user, "wedding date:", user?.wedding?.wedding_date)

    return (
        <ProfileContainer>
            <DrawerOpener navigation={navigation} />
            {user? <Text style={profileStyles.textStyle}>Welcome back to planning mode, {user.first_name}</Text>: null}
            
            <Text>{user?.wedding?.wedding_date}</Text>

            <View>
         
            <Pressable
                onPress={handleOpenDatePicker}
                style={{backgroundColor:`${colors.mediumgreen}`, padding:10, borderRadius:50}}
                >
                <Text style={{color:`${colors.darkgreen}`, fontWeight:"bold"}}>SET A DATE</Text>
            </Pressable>
            <DateTimePickerModal 
                    isVisible={datePickerVisible} 
                    display="inline"
                    mode="datetime"
                    onConfirm={handleDateConfirm} 
                    onCancel={handleDateCancel} 
                    timeZoneOffsetInMinutes={0}
                /> 
            </View>
            <Pressable
                onPress={() => tryLoggingOut()}
                style={{backgroundColor:`${colors.mediumgreen}`, padding:10, borderRadius:50}}
                >
                <Text style={{fontWeight:"bold", color:`${colors.darkgreen}`}}>LOG OUT</Text>
            </Pressable>
            
            
        </ProfileContainer>
    )
}


const profileStyles = StyleSheet.create({
    textStyle: {
       fontSize: 25,
       fontWeight: 'bold',
       padding: 10,
       color:'white',
       marginBottom: 60,
       marginTop: 80,
       margin:50,
    }
})

export default Profile;