import React, {FunctionComponent} from "react";
import styled from "styled-components/native";
import { colors } from "./colors";
import RegText from "./Texts/RegText";
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Container } from "./shared";
import ToDo from "./ToDo";
import { Text, View,  } from "react-native";
import {Formik} from 'formik';
import RegularButton from "./Buttons/RegularButton";
import Guest from "./Guest";

const ListItem = styled(Container)`
background-color:${colors.lightgreen};
padding: 10px;
padding-left:10px;
margin: 5px;
width:95%;
border-radius:50px;
flexDirection:row;
justifyContent: space-between;
`

const DoneText = styled.Text`
font-size: 20px;
color: ${colors.black};
text-align: left;
font-family: Roboto-Regular;
`

interface ItemProps {
    item: Guest;
    guests: Guest[];
    setGuests: React.Dispatch<React.SetStateAction<Guest[]>>,

}

const IconView = styled.View`
flexDirection:row;
margin:5px;
`

const GuestListItem:FunctionComponent<ItemProps> = ({item, guests, setGuests}) => {

    // const editTodos = (id:number | string) => {
    //     setGuests(
    //         guests.map((t) => 
    //         t.id === id? {...t, isAttending :!t.isAttending} : t)
    //     )
    // }


    

    return (
            <View>
                <Text>{item.first_name}</Text>
            </View>
    )
};

export default GuestListItem;