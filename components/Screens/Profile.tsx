import React, {FunctionComponent, useState, useEffect} from "react";
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
justify-content: between;
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

const API_URL = "http://192.168.1.6:5555"

const Profile:FunctionComponent = ({navigation}:any) => {
    const {onLogout, user, setUser} = useAuth()
    const [isEditWeddingShown, setIsEditWeddingShown] = useState<boolean>(false)
    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false)
    const [wedDate, setWedDate] = useState(new Date())
    const [showWeddings, setShowWeddings]= useState<Wedding[]>([])

    const handleDateCancel = () => { 
        setDatePickerVisible(false); 
    }

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
        const getWeddings = async () => {
            try {
                const result = await fetch(`${API_URL}/users/${user?.id}`)
                const data = await result.json()
                
                console.log("This is the getWeddings useEffect:", data.weddings)
                setShowWeddings(data.weddings)

            } catch (e) {
                console.log("Error during reuqest for user info", "e:", e)
                return {error: true, msg:(e as any).response.data.msg}
            }
        }
        getWeddings()
    }, [wedDate])

    // console.log(user?.weddings, user?.first_name, user?.last_name)
    // console.log("wedding date:", user?.weddings)

    const displayWeddingDate = showWeddings.map((w, i) => {
        return (
            <View key={i}>
                <Text>{w.wedding_date}</Text>
            </View>
        )
    })


    return (
        <ProfileContainer>
            <DrawerOpener navigation={navigation} />
            {user? <Text style={profileStyles.textStyle}>Welcome back to planning mode, {user.first_name}</Text>: null}
            
            {displayWeddingDate}

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
                    // onConfirm={(date) => {console.log("what is this?",date)}} 
                    onCancel={handleDateCancel} 
                    timeZoneOffsetInMinutes={0}
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