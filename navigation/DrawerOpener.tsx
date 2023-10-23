import { Text, View, Button } from "react-native"
import { Entypo } from '@expo/vector-icons';
import styled from "styled-components/native";
import { Container } from "../components/shared";
import { colors } from "../components/colors";
import { TouchableHighlight } from "react-native-gesture-handler";
import { FunctionComponent, useState } from "react";



const MenuContainer = styled.View`
background-color: ${colors.darkgreen};
text-align: left;
align-items:left;
padding-top:40px;
padding-left:20px;
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
                    <Entypo name="menu" size={35} color="black" />
                </View>
            </TouchableHighlight>    
        </MenuContainer>
    )
}

export default DrawerOpener;