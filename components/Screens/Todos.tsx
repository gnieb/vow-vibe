import React, {FunctionComponent, useState} from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import NewToDo from "../NewToDo";
import { Container } from "../shared";
import ToDo from "../ToDo";
import {View} from 'react-native';
import RegText from "../Texts/RegText";

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
padding:10px;

`


const Todos: FunctionComponent = () => {
const [todos, setTodos] = useState<ToDo[]>([{ todo:"this", isDone:false}, { todo:"that", isDone:false}, { todo:"the other thing", isDone:false}])


const displayTodos = todos.map(t => {
return (
    <>
    </>
)
})

    return (
        <TodosContainer>
            <NewToDo todos={todos} setTodos={setTodos} />
            <ListView>
                <RegText>ToDos</RegText>
            </ListView>
        </TodosContainer>
    )
}

export default Todos;