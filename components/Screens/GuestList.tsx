import React, {useState, useEffect, FunctionComponent} from "react";
import styled from "styled-components/native";
import { View, Text, FlatList, ScrollView, StyleSheet } from "react-native";
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
    const [guests, setGuests] = useState<Guest[]>([{id:1, user_id:1, first_name:"Abby", last_name:"Knowlton"}, {id:2, user_id:1, first_name:"Bryant", last_name:"Knowlton"}])
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

    return (
        <>
        <DrawerOpener navigation={navigation}/>
        <GuestContainer >
            <NewGuest guests={guests} setGuests={setGuests} addNew={addNew} />
            <GuestView>
            <Text style={{ fontSize: 12, textAlign: "left",marginTop:10,fontWeight:'bold' }}>
                    TOTAL - {guests.length}
            </Text>
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
                {/* <ScrollView>
                    <View>
                    {guests.map((guest) => {
                        return (
                        <View>
                            <GuestListItem item={guest} guests={guests} setGuests={setGuests}  />
                        </View>
                        );
                    })}
                    </View>
                </ScrollView> */}
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

