import React, {FunctionComponent, useState, useEffect} from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import NewToDo from "../NewToDo";
import { Container } from "../shared";
import ToDo from "../ToDo";
import ToDoList from "../ToDoList";

const TodosContainer = styled(Container)`
background-color: ${colors.darkgreen};
width: 100%;
height:100%;
flex:1;
align-items: center;
justifyContent: center;
`

const getToDos = async (url:string): Promise<any > => {
    try {
        const response = await fetch(url)
        const { data } = await response.json()
        return data
    } catch (error) {
        if (error) {
            console.log("oh no", error)
        }
    }
}

const Todos: FunctionComponent = () => {
const [todos, setTodos] = useState<ToDo[]>([{id:1, todo:"this", isDone:false}, {id:2, todo:"that", isDone:false}, {id:3, todo:"the other thing", isDone:false}])

useEffect(() => {
    getToDos("")
}, [])


    return (
        <TodosContainer>
            <NewToDo todos={todos} setTodos={setTodos} />
            <ToDoList todos={todos} setTodos={setTodos}/>
        </TodosContainer>
    )
}

export default Todos;