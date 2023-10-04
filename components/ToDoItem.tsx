import React, {FunctionComponent} from "react";
import styled from "styled-components/native";
import { colors } from "./colors";
import RegText from "./Texts/RegText";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Container } from "./shared";
import ToDo from "./ToDo";

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

interface ItemProps {
    item: ToDo;
}

const ToDoItem:FunctionComponent<ItemProps> = ({item}) => {
    return (
        <ListItem>
            <RegText>{item.todo}</RegText>
        </ListItem>
    )
};

export default ToDoItem;