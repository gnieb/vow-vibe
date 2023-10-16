import React, {FunctionComponent} from "react";
import { FlatList } from 'react-native';
import { Container } from "./shared";
import styled from "styled-components/native";
import { colors } from "./colors";
import ToDo from "./ToDo";
import RegText from "./Texts/RegText";
import ToDoItem from "./ToDoItem";

const ListView = styled.View`
background-color:${colors.mediumgreen};
width:100%;
border-radius: 50px;
padding:10px;
margin-top:15px;
justifyContent:center;
`

interface ListProps {
    todos : ToDo[],
    setTodos : React.Dispatch<React.SetStateAction<ToDo[]>>
}

const ToDoList:FunctionComponent<ListProps> = ({todos, setTodos}) => {
    return (
        <ListView>
            <FlatList
                data={todos}
                renderItem={({item}) => <ToDoItem item={item} key={item.id} todos={todos} setTodos={setTodos}/>}
            />
        </ListView>
    )
}

export default ToDoList;