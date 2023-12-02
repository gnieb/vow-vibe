import React, {FunctionComponent, useState, useEffect} from "react";
import { Text, StyleSheet, View, Pressable, ImageBackground} from "react-native";
import { Container } from "../shared";
import { colors } from "../colors";
import styled from "styled-components/native";
import DrawerOpener from "../../navigation/DrawerOpener";
import {  useAuth,  } from "../../context/AuthContext";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { API_URL } from "../../assets/API";
import background from '../../assets/vowVibephotos/sunsetFlowers.jpg'

const ProfileContainer = styled(Container)`
background-color: ${colors.darkgreen};
width: 100%;
flex:1;
justify-content: between;
`

const ImageBackgroundContainer = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Profile:FunctionComponent = ({navigation}:any) => {
    const {onLogout, user, setUser} = useAuth()
    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false)
    const [wedDate, setWedDate] = useState(new Date())
    // const [showWedding, setshowWedding]= useState<Wedding[]>([])

    const handleDateCancel = () => { 
        setDatePickerVisible(false); 
    }

    // console.log(user.wedding.id)

    const patchWedding = async (data:any) => {
            try {
                const resp = await fetch(`${API_URL}/weddings/${user.wedding.id}`, {
                method: "PATCH",
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
            user_id: user.id
        }
        patchWedding(newWed)
        console.log("date passed into handleDateConfirm:",date)
        // example : 2023-11-24T15:19:00.000Z
        setUser? setUser({
            ...user,
            wedding: {
                wedding_date:date,
                user_id: user.id
            }
        }): user

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
                const result = await fetch(`${API_URL}/users/${user.id}`)
                const data = await result.json()
                
                console.log("This is the getWeddings useEffect:", data.wedding)
                // setshowWedding(data.wedding)

            } catch (e) {
                console.log("Error during reuqest for user info", "e:", e)
                return {error: true, msg:(e as any).response.data.msg}
            }
        }
        getWedding()
    }, [wedDate])

    console.log("initial wedDate:", wedDate)
    console.log("date object for:", new Date(user.wedding.wedding_date))

    useEffect(() => {
        // Update expiryDate when the user object changes
        setWedDate(new Date(user.wedding.wedding_date));
        console.log("Updated wedDate:", wedDate)
      }, [user]);

    // console.log(user?.weddings, user?.first_name, user?.last_name)
    // console.log("user:", user, "wedding date:", user?.wedding?.wedding_date)

    return (
        <ProfileContainer>
            <DrawerOpener navigation={navigation} />
            <ImageBackgroundContainer
                source={background}
                style={profileStyles.image}
                resizeMode="cover"
                >
            {user? <Text style={profileStyles.textStyle}>Welcome back to planning mode, {user.first_name}</Text>: null}
            
            <Text style={{fontSize:20, color:"white", fontWeight:"bold"}}>My Wedding {wedDate.toLocaleDateString()}</Text>
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
            </ImageBackgroundContainer>
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
    }, 
    image: {
        flex: 1,
        width: '100%',
    }
})

export default Profile;