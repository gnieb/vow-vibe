import { Text, View, Button } from "react-native"
import { Entypo } from '@expo/vector-icons';
import styled from "styled-components/native";
import { Container } from "../components/shared";
import { colors } from "../components/colors";
import { TouchableHighlight } from "react-native-gesture-handler";



const MenuContainer = styled.View`
background-color: ${colors.darkgreen};
text-align: left;
align-items:left;
padding-top:40px;
padding-left:20px;
`

const DrawerOpener = () => {
    return (
        <MenuContainer>
                

            <TouchableHighlight onPress={()=>{console.log("pushed!")}}>
            <View>
                <Entypo name="menu" size={35} color="black" />
            </View>
            </TouchableHighlight>    
                
            
        </MenuContainer>
    )
}

export default DrawerOpener;