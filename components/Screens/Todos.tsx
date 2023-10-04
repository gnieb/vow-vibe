import React, {FunctionComponent, useState} from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import NewToDo from "../NewToDo";
import { Container } from "../shared";
import ToDo from "../ToDo";
import {View, ListRenderItem, FlatList } from 'react-native';
import RegText from "../Texts/RegText";
import BigText from "../Texts/BigText";

const TodosContainer = styled(Container)`
background-color: ${colors.darkgreen};
width: 100%;
height:100%;
flex:1;
align-items: center;
justifyContent: center;
`

const ListView = styled.View`
background-color:${colors.mediumgreen};
width:90%;
border-radius: 50px;
padding:30px;
margin-top:15px;
`


const Todos: FunctionComponent = () => {
const [todos, setTodos] = useState<ToDo[]>([{id:1, todo:"this", isDone:false}, {id:2, todo:"that", isDone:false}, {id:3, todo:"the other thing", isDone:false}])



    return (
        <TodosContainer>
            <NewToDo todos={todos} setTodos={setTodos} />
            <ListView>
                <BigText>TO DO</BigText>
                <FlatList
                    data={todos}
                    renderItem={({item}) => <RegText>{item.todo}</RegText>}
                />

               
            </ListView>
        </TodosContainer>
    )
}

export default Todos;