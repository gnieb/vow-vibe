import React, {useState, useEffect, FunctionComponent} from "react";
import styled from "styled-components/native";
import { View, Text, FlatList } from "react-native";
import { colors } from "../colors";
import Guest from "../Guest";
import GuestListItem from "../GuestListItem";
import RegText from "../Texts/RegText";
import { Container } from "../shared";


const GuestView = styled.View`
background-color:${colors.mediumgreen};
width:100%;
border-radius: 50px;
padding:10px;
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

const GuestList:FunctionComponent = () => {
    const [guests, setGuests] = useState<Guest[]>([{id:1, wedding_id:1, first_name:"Abby", last_name:"Knowlton"}, {id:2, wedding_id:1, first_name:"Bryant", last_name:"Knowlton"}])



    return (
        <GuestContainer >
            <GuestView>
                <RegText>THE LIST</RegText>
            </GuestView>
            <GuestView>
                <FlatList data={guests} 
                renderItem={({item}) => <GuestListItem item={item} key={item.id} guests={guests} setGuests={setGuests} />}/>
            </GuestView>
        </GuestContainer>
    )
}

export default GuestList;