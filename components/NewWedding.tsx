import { FunctionComponent, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import RegularButton from "./Buttons/RegularButton";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from "../context/AuthContext";
import { colors } from "./colors";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

let initialValues = {
    wedding_date: ""
}

const NewWeddingSchema = Yup.object().shape({
    date: Yup.date()
      .required('Please enter the date of your wedding'),
  });

  const API_URL = "http://192.168.1.14:5555"




const NewWedding:FunctionComponent = () => {
    const {user} = useAuth()
    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false)
    const [wedDate, setWedDate]= useState(new Date())

    const handleDateCancel = () => { 
        setDatePickerVisible(false); 
    }


    const postWedding = async (data:any) => {
            try {
                const resp = await fetch(`${API_URL}/weddings`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify(data)
            })

        } catch (e) {
            return {error: true, msg:(e as any).response.data.msg}
        } 

    }

    console.log(user)

    const handleDateConfirm = (date:any) => { 
        // POST to database!
        
        const newWed = {
            date: date,
            user_id: user.id
        }
        postWedding(newWed)
       
        // console.log(date)
        // example : 2023-11-24T15:19:00.000Z
        setWedDate(date); 
        setDatePickerVisible(false); 
    }; 

    const handleOpenDatePicker = () => {
        setDatePickerVisible(true)
    }

    return (
       
        <View>
         
            <Pressable
                style={styles.button}
                onPress={handleOpenDatePicker} 
                >
                <Text>Set a Date</Text>
            </Pressable>
            <DateTimePickerModal 
                    isVisible={datePickerVisible} 
                    display="inline"
                    mode="datetime"
                    onConfirm={handleDateConfirm} 
                    onCancel={handleDateCancel} 
                /> 
            </View>
    )
}


const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        padding: 20, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#f0f0f0", 
    }, 
    title: { 
        fontSize: 30, 
        fontWeight: "bold", 
        paddingVertical: 20, 
        color: "green", 
    }, 
    subtitle: { 
        marginBottom: 20, 
        fontSize: 18, 
    }, 
    timer: { 
        flexDirection: "row", 
        alignItems: "center", 
    }, 
    timeUnit: { 
        fontSize: 40, 
        fontWeight: "bold", 
        paddingHorizontal: 5, 
        paddingVertical: 5, 
    }, 
    yearUnit: { 
        // backgroundColor: `${colors.darkgreen}`, 
        borderRadius: 15, 
        color: `${colors.darkgreen}`, 
    }, 
    dayUnit: { 
        // backgroundColor: `${colors.darkgreen}`, 
        borderRadius: 15, 
        color: `${colors.darkgreen}`, 
    }, 
    hourUnit: { 
        // backgroundColor: `${colors.darkgreen}`, 
        borderRadius: 15, 
        color: `${colors.darkgreen}`,  
    }, 
    minuteUnit: { 
        // backgroundColor: `${colors.darkgreen}`, 
        borderRadius: 15, 
        color: `${colors.darkgreen}`, 
    }, 
    secondUnit: { 
        // backgroundColor: `${colors.darkgreen}`, 
        borderRadius: 15, 
        color: `${colors.darkgreen}`, 
    }, 
    timeSeparator: { 
        fontSize: 24, 
        fontWeight: "bold", 
        marginHorizontal: 5, 
    }, 
    timetitle: { 
        fontSize: 17, 
        padding: 10, 
        paddingRight: 19, 
        fontWeight: "bold", 
    }, 
    buttonText: {
        color: `${colors.darkgreen}`,
        fontSize: 20,
        textAlign: 'center',
      },
    button: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding:10,
        borderRadius: 50,
        justifyContent: 'center',
        margin:2,
    },
    buttonContainer: {
        width:'40%',
        justifyContent:'center',
        flexDirection: "row", 
        alignItems: "center", 
    }
});

export default NewWedding;
