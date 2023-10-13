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

    const editTodos = (id:number | string) => {
        setGuests(
            guests.map((t) => 
            t.id === id? {...t, isAttending :!t.isAttending} : t)
        )
    }

    return (
           
            <ListItem>
                {item.isAttending ? <DoneText style={{ textDecorationLine: 'line-through' }}>
                {item.first_name}</DoneText> : <RegText>{item.first_name}</RegText>}
                
                <IconView>
                <Formik
                initialValues={item}
                onSubmit={()=> {
                    console.log(item)
                    editTodos(item.id)
                }}
                >
                {({ handleChange, handleBlur, handleSubmit, values  }) => (
                <MaterialCommunityIcons onPress={()=> handleSubmit()} name="check" size={24} color="black" />
                )}
                </Formik>
                <Formik
                initialValues={item}
                onSubmit={()=> {
                    console.log("Time to EDIT!!!")
                }}
                >
                {({ handleChange, handleBlur, handleSubmit, values  }) => (
                <Feather onPress={()=> handleSubmit()} name="edit-2" size={24} color="black" />
                )}
                </Formik>
                
                </IconView>
            </ListItem>
    )
};

export default GuestListItem;