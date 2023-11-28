import React, {FunctionComponent} from "react";
import styled from "styled-components/native";
import { colors } from "./colors";
import RegText from "./Texts/RegText";
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Container } from "./shared";
import ToDo from "./ToDo";
import { Text, View,StyleSheet  } from "react-native";
import {Formik} from 'formik';
import RegularButton from "./Buttons/RegularButton";
import Guest from "./Guest";

const ListItemView = styled.View`
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
            <ListItemView>
                <Text style={styles.item}>{item.first_name} {item.last_name}</Text>
                <IconView>
                  <MaterialCommunityIcons onPress={()=> {}} name="check" size={24} color="black" />
                  <Feather onPress={()=> handleSubmit()} name="x" size={24} color="black" />
                </IconView>
                
            </ListItemView>
    )
};

export default GuestListItem;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 5,
      fontSize: 30,
    },
    item: {
      padding: 10,
      marginTop: 5,
      fontSize: 15,
    },
  });