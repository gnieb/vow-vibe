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


const GuestView = styled.View`
background-color:${colors.mediumgreen};
width:100%;
border-radius: 50px;
padding:10px;
margin-top:15px;
justifyContent:center;
`

const GuestListTitleView = styled.View`
background-color:${colors.mediumgreen};
width:100%;
text-align: center;
border-radius: 50px;
padding:20px;
margin-top:15px;
justifyContent:center;
`

const GuestContainer = styled(Container)`
background-color: ${colors.darkgreen};
width: 100%;
height:100%;
flex:1;
align-items: center;
justifyContent: center;
`



const GuestList:FunctionComponent = ({navigation}:any) => {
    const [guests, setGuests] = useState<Guest[]>([{id:1, wedding_id:1, first_name:"Abby", last_name:"Knowlton"}, {id:2, wedding_id:1, first_name:"Bryant", last_name:"Knowlton"}])
       
    const addNew = (newG:Guest) => {setGuests((guests) => [...guests, newG])}

    const displayAll = guests.map((g, i) => {
        return (
            <GuestListItem key={i} item={g} guests={guests} setGuests={setGuests} />
        )
    })

    return (
        <>
        <DrawerOpener navigation={navigation}/>
        <GuestContainer >
            <NewGuest guests={guests} setGuests={setGuests} addNew={addNew} />
            <GuestListTitleView>
                <RegText textStyles={{color:"white", textAlign:"center", fontSize:30, fontFamily:"Helvetica"}}>Who is Invited</RegText>
            </GuestListTitleView>
            <GuestView>
                {/* <FlatList data={guests} 
                renderItem={({item}) => <GuestListItem item={item} guests={guests} setGuests={setGuests}  />}
                keyExtractor={(item, index) => index.toString()}
                /> */}
                <ScrollView>
                    <View>
                    {guests.map((guest) => {
                        return (
                        <View>
                            <GuestListItem item={guest} guests={guests} setGuests={setGuests}  />
                        </View>
                        );
                    })}
                    </View>
                </ScrollView>
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

