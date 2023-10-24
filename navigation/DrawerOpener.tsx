import { Text, View, Button } from "react-native"
import { Entypo } from '@expo/vector-icons';
import styled from "styled-components/native";
import { colors } from "../components/colors";
import { TouchableHighlight } from "react-native-gesture-handler";
import { FunctionComponent, useState } from "react";



const MenuContainer = styled.View`
background-color: transparent;
text-align: left;
align-items:left;
width: 50px;
padding-top:40px;
padding-left:20px;
position:absolute;
top:0;
left:0;
z-index:2;
`

// need to set state assigned to drawer open vs closed... 

interface DrawerOpenerProps {
    navigation: any;
}




const DrawerOpener:FunctionComponent<DrawerOpenerProps> = ({navigation}) => {

    return (
        <MenuContainer>
            <TouchableHighlight onPress={()=> {
                navigation.openDrawer()
                }}>
                <View>
                    <Entypo name="menu" size={40} color="white" />
                </View>
            </TouchableHighlight>    
        </MenuContainer>
    )
}

export default DrawerOpener;