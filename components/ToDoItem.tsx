import React, {FunctionComponent} from "react";
import styled from "styled-components/native";
import { colors } from "./colors";
import RegText from "./Texts/RegText";
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Container } from "./shared";
import ToDo from "./ToDo";
import { View,  } from "react-native";
import {Formik} from 'formik';
import RegularButton from "./Buttons/RegularButton";

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

interface ItemProps {
    item: ToDo;
    todos: ToDo[];
    setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>,
}

const IconView = styled.View`
flexDirection:row;
margin:5px;
`

const ToDoItem:FunctionComponent<ItemProps> = ({item, todos, setTodos}) => {
    return (
        <Formik
        initialValues={item}
        onSubmit={()=> console.log(item)}
        >
            {({ handleChange, handleBlur, handleSubmit, values  }) => (
            <ListItem>
                <RegText>{item.todo}</RegText>
                <IconView>
                <MaterialCommunityIcons onPress={()=> handleSubmit()} name="check" size={24} color="black" />
                <Feather name="edit-2" size={24} color="black" />
                </IconView>
            </ListItem>
            )}
        </Formik>
    )
};

export default ToDoItem;