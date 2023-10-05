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
    item: ToDo;
    todos: ToDo[];
    setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>,
}

const IconView = styled.View`
flexDirection:row;
margin:5px;
`

const ToDoItem:FunctionComponent<ItemProps> = ({item, todos, setTodos}) => {

    const editTodos = (id:number | string) => {
        setTodos(
            todos.map((t) => 
            t.id === id? {...t, isDone :!t.isDone} : t)
        )
    }

    return (
           
            <ListItem>
                {item.isDone ? <DoneText style={{ textDecorationLine: 'line-through' }}>
                {item.todo}</DoneText> : <RegText>{item.todo}</RegText>}
                
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

export default ToDoItem;