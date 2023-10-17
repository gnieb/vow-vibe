import React, {FunctionComponent} from "react";
import styled from "styled-components/native";
import { Container } from "./shared";import { TextInput, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import RegularButton from "./Buttons/RegularButton";
import RegText from "./Texts/RegText";
import ToDo from "./ToDo";
import { useState } from "react";
import * as Yup from 'yup';
import { colors } from "./colors";
import Guest from "./Guest";


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
    setGuests: React.Dispatch<React.SetStateAction<Guest[]>>,
    guests: Guest[]
}

const NewGuest:FunctionComponent<FormProps> = ({guests, setGuests}) => {
    const initialValues = {
        first_name:"",
        last_name:"",
    }
    
    
    return (
       
            <Formik
        initialValues={initialValues}
        validationSchema={GuestSchema}
        onSubmit={(val, {resetForm}) => {
            console.log(val)
            console.log("HI")
            const newGuest:Guest = {id: Date.now(), first_name: val.first_name, last_name:val.last_name}
            setGuests(guests => [...guests, newGuest])
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
             style={formStyles.inputStyle}
            />
           </View>
         <RegularButton  onPress={()=> handleSubmit()} >Submit</RegularButton>

       </View>
     )}
    </Formik>
    )
}

const formStyles = StyleSheet.create({
   
     formContainer : {
        backgroundColor: `${colors.lightgreen}`,
        padding: 20,
        borderRadius: 50,
        width: '90%',
    
     },
     title : {
        color: `${colors.darkgreen}`,
        fontSize: 26,
        fontWeight: '400',
        marginBottom: 15,
     },
     inputWrapper: {
        marginBottom: 15,
     },
     inputStyle: {
        borderColor: `${colors.mediumgreen}`,
        borderWidth: 1,
        borderRadius: 50,
        padding: 10,
     }
})

export default NewGuest;
