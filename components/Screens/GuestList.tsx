import React, {useState, useEffect, FunctionComponent} from "react";
import styled from "styled-components/native";
import { Text, FlatList, StyleSheet, ImageBackground, View } from "react-native";
import { colors } from "../colors";
import Guest from "../Guest";
import GuestListItem from "../GuestListItem";
import RegText from "../Texts/RegText";
import { Container } from "../shared";
import NewGuest from "../NewGuest";
import DrawerOpener from "../../navigation/DrawerOpener";
import { useAuth } from "../../context/AuthContext";
import { API_URL } from "../../assets/API";
import pic from '../../assets/vowVibephotos/polaroidJustMarriedw.jpg'

const GuestView = styled.View`
width:100%;
height: 50%;
border-radius: 50px;
padding:10px;
margin-top:15px;
justifyContent:center;
`

const FilterContainer = styled.View`
flexDirection:row;
justifyContent: space-between;
`

const ButtonView = styled.TouchableOpacity`
align-items: center;
background-color: white;
width: 30%;
padding: 6px;
margin:5px;
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

const ImageBackgroundContainer = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const GuestList:FunctionComponent = ({navigation}:any) => {
    const {user} = useAuth()
    const [guests, setGuests] = useState<Guest[]>([])
    const [attendanceFilter, setAttendanceFilter] = useState<boolean|null>(null)
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

    const changeToGuestNotAttending = (gid:number|undefined, isAtt:boolean) => {
        const updatedGuests = guests.map((g) => {
            if (g.id == gid) {
               const updatedGuest = {
                ...g,
                "isAttending": isAtt
                } 
            return updatedGuest
            } else {
                return g
            }})
        // set guests to be the same, but edit the guest found
        setGuests(guests => updatedGuests)
    }

    const changeToGuestAttending = (gid:number, isAtt:boolean) => {
        const updatedGuests = guests.map((g) => {
            if (g.id == gid) {
               const updatedGuest = {
                ...g,
                "isAttending": isAtt
                } 
            return updatedGuest
            } else {
                return g
            }})
        // set guests to be the same, but edit the guest found
        setGuests(guests => updatedGuests)
    }

    const handleAttendanceFilter = (value:boolean|null) => setAttendanceFilter(value)
    const filteredByAttendance = (attendanceFilter != null) ? guests.filter(g => g.isAttending == attendanceFilter ) : [...guests ]


    return (
        <>
        <DrawerOpener navigation={navigation}/>
        
        <GuestContainer >
            <ImageBackgroundContainer
            source={pic}
            style={styles.image}
            resizeMode="cover"
            >
            <NewGuest guests={guests} setGuests={setGuests} addNew={addNew} />
            <GuestView>
            <Text style={{ fontSize: 15, textAlign: "left",marginTop:10,fontWeight:'bold' }}>
                    TOTAL INVITED - {guests.length}
            </Text>
            <FilterContainer>
                <ButtonView
                onPress={()=> {
                    handleAttendanceFilter(null)   
                }}
                >
                    <Text>All</Text>
                </ButtonView>
                <ButtonView
                onPress={()=> {
                    handleAttendanceFilter(true)
                }}
                >
                    <Text>Attending</Text>
                </ButtonView>
                <ButtonView
                onPress={()=> {
                    handleAttendanceFilter(false)   
                }}
                >
                    <Text>Not Attending</Text>
                </ButtonView>
            </FilterContainer>
            <View style={styles.flatlist}>
                <FlatList data={filteredByAttendance} 
                renderItem={({item}) => <GuestListItem 
                    changeToGuestNotAttending={changeToGuestNotAttending} 
                    changeToGuestAttending={changeToGuestAttending}
                    item={item} 
                    guests={guests} 
                    setGuests={setGuests}  />}
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
                </View>
            </GuestView>
            </ImageBackgroundContainer>
        </GuestContainer>
        
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 50,
      flex: 1,
    },
    image: {
        flex: 1,
        width: '100%',
      },
    item: {
      padding: 20,
      fontSize: 15,
      marginTop: 5,
    },
    flatlist: {
        backgroundColor:"white",
        opacity:.6,
        borderRadius:50,
        padding:10,
        margin:10,
    },
  });

export default GuestList;

