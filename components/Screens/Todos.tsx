import React, {FunctionComponent, useState, useEffect} from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import NewToDo from "../NewToDo";
import { Container } from "../shared";
import ToDo from "../ToDo";
import ToDoList from "../ToDoList";
import DrawerOpener from "../../navigation/DrawerOpener";
import { ImageBackground, StyleSheet, Dimensions, ScrollView } from "react-native";

const TodosContainer = styled(Container)`
background-color: ${colors.darkgreen};
width: 100%;
height:100%;
flex:1;
align-items: center;
justifyContent: center;
`

const ScrollContainer = styled.ScrollView`
width: 100%;
flex:1;
`

const ScreenView = styled.View`
height:100%;
width: 100%;
position:relative;
z-index:1;
`
  // for TESTING: json placeholder data url: "https://jsonplaceholder.typicode.com/todos/"
import chair from '../../assets/vowVibephotos/forestChair.jpg'

const Todos: FunctionComponent = ({navigation}:any) => {
const [todos, setTodos] = useState<ToDo[]>([{id:1, todo:"this", isDone:false}, {id:2, todo:"that", isDone:false}, {id:3, todo:"the other thing", isDone:false}])

useEffect(() => {
            fetch("http://192.168.1.14:5555/users/1")
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

   

    return (
        <ScreenView>
            <ImageBackground
            source={chair}
            style={styles.image}
            resizeMode="cover"
            >
        <DrawerOpener navigation={navigation} />      
            <TodosContainer>
                <NewToDo todos={todos} setTodos={setTodos} />
                <ToDoList todos={todos} setTodos={setTodos}/>
            </TodosContainer>
        </ImageBackground>
        </ScreenView>
    )
}

const styles = StyleSheet.create({
    image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
      flex: 1,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right:0,
      zIndex:-1
    },
    text: {
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      buttonText: {
        color: `${colors.darkgreen}`,
        fontSize: 15,
        textAlign: 'center',
      },
  });

export default Todos;