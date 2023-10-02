import React, {FunctionComponent, useState} from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import NewToDo from "../NewToDo";
import { Container } from "../shared";

const TodosContainer = styled(Container)`
background-color: ${colors.darkgreen};
width: 100%;
flex:1;
`


const Todos: FunctionComponent = () => {
const [todos, setTodos] = useState(['this', 'that', 'the other thing'])


const displayTodos = todos.map(t => {

})

    return (
        <TodosContainer>
        <NewToDo />
        </TodosContainer>
    )
}

export default Todos;