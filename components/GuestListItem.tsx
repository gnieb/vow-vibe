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
    changeToGuestNotAttending: (gid: number, isAtt: boolean) => void;
    changeToGuestAttending: (gid: number, isAtt: boolean) => void;
}

const IconView = styled.View`
flexDirection:row;
margin:5px;
`

const GuestListItem:FunctionComponent<ItemProps> = ({item, guests, setGuests, changeToGuestNotAttending,changeToGuestAttending }) => {

  const API_URL = "http://192.168.1.6:5555"

    const editGuest = async(updatedG:Guest) => {
      try{
        const data = await fetch(`${API_URL}/guests/${item.id}`, {
          method: "PATCH",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(updatedG)
        })
      } catch (e) {
        return {error: true, msg:(e as any).response.data.msg}
    } 
    }

    const handleNotComing = (item:Guest) => {
      const updatedGuest = {
        ...item,
        "isAttending": false
      }
      editGuest(updatedGuest)
      changeToGuestNotAttending(updatedGuest.id, false)
    }

    const handleComing = (item:Guest) => {
      const updatedGuest = {
        ...item,
        "isAttending": true
      }
      editGuest(updatedGuest)
      changeToGuestAttending(updatedGuest.id, true)
    }




    

    return (
            <ListItemView>
                <Text style={styles.item}>{item.first_name} {item.last_name}</Text>
                <IconView>
                  <MaterialCommunityIcons onPress={()=> {handleComing(item)}} name="check" size={24} color="black" />
                  <Feather onPress={()=> handleNotComing(item)} name="x" size={24} color="black" />
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