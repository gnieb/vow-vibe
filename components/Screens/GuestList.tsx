import React, {useState, useEffect, FunctionComponent} from "react";
import styled from "styled-components/native";
import { View, Text, FlatList } from "react-native";
import { colors } from "../colors";
import Guest from "../Guest";
import GuestListItem from "../GuestListItem";


const GuestView = styled.View`
background-color:${colors.mediumgreen};
width:100%;
border-radius: 50px;
padding:10px;
margin-top:15px;
justifyContent:center;
`

const GuestList:FunctionComponent = () => {
    const [guests, setGuests] = useState<Guest[]>([])



    return (
        <GuestView>
            <Text>PEOPLE YOU  LOVE HERE!!!</Text>
            <FlatList data={guests} 
            renderItem={({item}) => <GuestListItem item={item} key={item.id} guests={guests} setGuests={setGuests} />}/>
        </GuestView>
    )
}

export default GuestList;