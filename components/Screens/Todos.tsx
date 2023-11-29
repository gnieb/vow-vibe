import React, {FunctionComponent, useState, useEffect} from "react";
import styled from "styled-components/native";
import NewToDo from "../NewToDo";
import { Container } from "../shared";
import ToDo from "../ToDo";
import ToDoList from "../ToDoList";
import DrawerOpener from "../../navigation/DrawerOpener";
import { ImageBackground, StyleSheet, Dimensions,FlatList, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import ToDoItem from "../ToDoItem";

const ToDosView = styled.View`
width: 100%;
flex:1;
margin-top:50px;
`

const ScreenContainer = styled(Container)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const NewContainer = styled(Container)`

`

const ToDoView = styled.View`
background-color:white;
opacity:.6;
width:90%;
height: 50%;
border-radius: 50px;
padding:20px;
margin-top:15px;
justifyContent:center;
`

const ImageBackgroundContainer = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
  // for TESTING: json placeholder data url: "https://jsonplaceholder.typicode.com/todos/"

import chair from '../../assets/vowVibephotos/forestChair.jpg'
import { API_URL } from "../../assets/API";

const Todos: FunctionComponent = ({navigation}:any) => {

    const { user } = useAuth()
    const [todos, setTodos] = useState<ToDo[]>([{id:1, todo:"this", isDone:false}, {id:2, todo:"that", isDone:false}, {id:3, todo:"the other thing", isDone:false}])

    useEffect(() => {
            fetch(`${API_URL}/users/${user.id}`)
            .then(r=> {
                if(r.ok){
                    r.json().then(data => {
                        console.log("DATA:", data)
                        setTodos(data.todos)
                    })
                } else {
                    console.log(r.text)
                }
            })
            .catch( (error) => {
            if (error) {
                console.log("oh no:", error)
            } 
        })
        
    }
, [])

const addNew = (newT:ToDo) => setTodos([...todos, newT])

    return (
        <>
        <DrawerOpener navigation={navigation} />
        <ScreenContainer>
            
            <ImageBackgroundContainer
            source={chair}
            style={styles.image}
            resizeMode="cover"
            >
                <NewToDo todos={todos} setTodos={setTodos} addNew={addNew} />
                <ToDoView>
                <FlatList data={todos} 
                    renderItem={({item}) => <ToDoItem 
                        todos={todos} 
                        setTodos={setTodos}
                        item={item} 
                    /> }
                keyExtractor={(item, index) => index.toString()}
                />
                </ToDoView>
                
            </ImageBackgroundContainer>
        </ScreenContainer>
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
      },
  });

export default Todos;