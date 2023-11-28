import React, {useState, useEffect, FunctionComponent} from "react";
import styled from "styled-components/native";
import { View, Text, FlatList, ScrollView, StyleSheet, Button } from "react-native";
import { colors } from "../colors";
import Guest from "../Guest";
import GuestListItem from "../GuestListItem";
import RegText from "../Texts/RegText";
import { Container } from "../shared";
import NewGuest from "../NewGuest";
import DrawerOpener from "../../navigation/DrawerOpener";
import { useAuth } from "../../context/AuthContext";

// background-color: white;
const GuestView = styled.View`

width:90%;
height: 50%;
border-radius: 50px;
padding:10px;
margin-top:15px;
justifyContent:center;
`

const ButtonView = styled.TouchableOpacity`
align-items: center;
background-color: white;
width: 30%;
padding: 6px;
margin-top: 50px;
margin-left:10px;
border-radius: 50px;
`


const GuestContainer = styled(Container)`
background-color: #e0e0e0;
width: 100%;
height:100%;
flex:1;
align-items: center;
justifyContent: center;
`


const API_URL = "http://192.168.1.6:5555"

const GuestList:FunctionComponent = ({navigation}:any) => {
    const {user} = useAuth()
    const [guests, setGuests] = useState<Guest[]>([])
    const addNew = (newG:Guest) => {setGuests((guests) => [...guests, newG])}

    useEffect(() => {
        const getGuests = async () => {
            try {
                const response = await fetch(`${API_URL}/users/${user?.id}`)
                const data = await response.json()
                setGuests(data.guests)

            } catch (e) {
                return {error: true, msg:(e as any).response.data.msg}
            } 
        }

        getGuests()
    }, [])


    const handleAttendingGuests = () => {
        console.log("ATTENDING GUESTS")
        const filteredByAttended = guests.filter(g => g.isAttending == true )
        console.log("these people are coming:",filteredByAttended)
    }

    return (
        <>
        <DrawerOpener navigation={navigation}/>
        <GuestContainer >
            <NewGuest guests={guests} setGuests={setGuests} addNew={addNew} />
            <GuestView>
            <Text style={{ fontSize: 12, textAlign: "left",marginTop:10,fontWeight:'bold' }}>
                    TOTAL - {guests.length}
            </Text>
            <ButtonView
            onPress={()=> {
                handleAttendingGuests()
                
            }}
            >
                <Text>Attending</Text>
            </ButtonView>
                <FlatList data={guests} 
                renderItem={({item}) => <GuestListItem item={item} guests={guests} setGuests={setGuests}  />}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => (
                    <Text style={{ fontSize: 20, textAlign: "center",marginTop:10,fontWeight:'bold' }}>
                    GUEST LIST
                    </Text>
                    
                )}
                ListFooterComponent={() => (
                    <Text style={{ fontSize: 20, textAlign: "center",marginBottom:20,fontWeight:'bold' }}>{`<3`}</Text>
                )}
                />
            </GuestView>
        </GuestContainer>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 50,
      flex: 1,
    },
    item: {
      padding: 20,
      fontSize: 15,
      marginTop: 5,
    }
  });

export default GuestList;

