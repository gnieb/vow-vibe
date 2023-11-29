import React, {FunctionComponent} from "react";
import styled from "styled-components/native";
import { Container } from "./shared";
import { TextInput, View, StyleSheet, Pressable, Text } from 'react-native';
import { Formik } from 'formik';
import RegularButton from "./Buttons/RegularButton";
import RegText from "./Texts/RegText";
import ToDo from "./ToDo";
import { useState } from "react";
import * as Yup from 'yup';
import { colors } from "./colors";
import Guest from "./Guest";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../assets/API";


const FormContainer = styled(Container)`
background-color: white;
width:100%;
border-radius: 50px;
padding:10px;
margin-top:15px;
justifyContent:center;
`



const GuestSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'Too Short!')
      .required('Required'),
    last_name: Yup.string()
    .min(1, 'Too Short!')
    .required('Required!')
  });


interface FormProps {
    addNew: (newG: Guest) => void,
    setGuests: React.Dispatch<React.SetStateAction<Guest[]>>,
    guests: Guest[]
}

const NewGuest:FunctionComponent<FormProps> = ({guests, setGuests, addNew}) => {
  const {user} = useAuth();

    const initialValues = {
        first_name:"",
        last_name:"",
    }

    // const handleAddGuest = (addNew:Guest) => {
    //   return addNew
    // }

    const postNewGuest = async (newG:Guest) => {
      try {
        const result = await fetch(`${API_URL}/guests`, {
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(newG)
      })

      return result

      } catch (e) {
        return {error: true, msg:(e as any).response.data.msg}
    } 

      
      
    }
    
    console.log(guests)
    return (
       
            <Formik
        initialValues={initialValues}
        validationSchema={GuestSchema}
        onSubmit={(val, {resetForm}) => {
            const newGuest:Guest = {first_name: val.first_name, last_name:val.last_name, user_id:user?.id}
            postNewGuest(newGuest)
            addNew(newGuest)
            resetForm({values: initialValues})
            
        }}
    >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched  }) => (
       <View style={formStyles.formContainer}>
     
         <RegText textStyles={formStyles.title}>Who's Next on the List?</RegText>
         <View style={formStyles.inputWrapper}>
            <TextInput
            onChangeText={handleChange('first_name')}
            onBlur={handleBlur('first_name')}
            value={values.first_name}
            placeholder="first name"
            placeholderTextColor="gray"
            style={formStyles.inputStyle}
            />
         </View>
         {errors.first_name && touched.first_name ? (
             <RegText>{errors.first_name}</RegText>
           ) : null }

           <View style={formStyles.inputWrapper}>
            <TextInput
             onChangeText={handleChange('last_name')}
             onBlur={handleBlur('last_name')}
             value={values.last_name}
             placeholder="last name"
             placeholderTextColor="gray"
             style={formStyles.inputStyle}
            />
           </View>
         <Pressable  onPress={()=> handleSubmit()} 
         style={formStyles.submitButton}
         >
          <Text style={{textAlign:"center", color:"white"}}>Submit</Text>
          </Pressable>

       </View>
     )}
    </Formik>
    )
}

const formStyles = StyleSheet.create({
   
     formContainer : {
        // backgroundColor: `white`,
        
        padding: 20,
        borderRadius: 50,
        width: '90%',
        marginTop:30,
    
     },
     title : {
        color: "black",
        fontSize: 26,
        fontWeight: '400',
        marginBottom: 15,
     },
     inputWrapper: {
        marginBottom: 15,
     },
     inputStyle: {
        borderColor: `gray`,
        borderWidth: 1,
        borderRadius: 50,
        padding: 10,
        color: "black",
     },
     submitButton: {
      backgroundColor: "gray",
      borderRadius: 50,
      padding:10,
      width: "30%",
     }
})

export default NewGuest;
