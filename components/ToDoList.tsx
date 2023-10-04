import React, {FunctionComponent} from "react";
import {View, ListRenderItem, FlatList } from 'react-native';
import { Container } from "./shared";
import styled from "styled-components/native";
import { colors } from "./colors";
import ToDo from "./ToDo";
import RegText from "./Texts/RegText";

const ListView = styled.View`
background-color:${colors.mediumgreen};
width:90%;
border-radius: 50px;
padding:30px;
margin-top:15px;
`

const ListItem = styled(Container)`
background-color:${colors.lightgreen};
padding: 5px;
padding-left:10px;
margin: 5px;
width:90%;
border-radius:50px;
flexDirection:row;
align-items:left;
justifyContent: space-between;
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
                renderItem={({item}) => <ListItem><RegText>{item.todo}</RegText><RegText>X</RegText></ListItem>}
            />

        </ListView>
    )
}

export default ToDoList;