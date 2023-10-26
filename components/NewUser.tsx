import React, { FunctionComponent } from "react";
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import RegularButton from "./Buttons/RegularButton";
import styled from "styled-components/native";
import { colors } from "./colors";
import RegText from "./Texts/RegText";
import { User } from "./User";
import { useState } from "react";
import * as Yup from 'yup';
import uuid from 'react-native-uuid';

let initialValues = {
    first_name: "",
    last_name:"",
    email:"",
}

const ToDoSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'Too Short!')
      .required('REQUIRED'),
    last_name: Yup.string()
    .min(2, 'Too Short!')
    .required('REQUIRED!'),
    email: Yup.string()
    .email('Invalid Email').required('REQUIRED!')
  });


const NewUser:FunctionComponent = () => {
    return (
        <Formik
        initialValues={initialValues}
        validationSchema={ToDoSchema}
        onSubmit={(val, {resetForm}) => {
            console.log(val)
            const newUser:User = {email:val.email, first_name: val.first_name, last_name: val.last_name, todos: []}
            // do something with the newUser:
            // POST new User to server/database
            console.log(newUser)

            resetForm({values: initialValues})
        }}
    >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched  }) => (
       <View style={formStyles.formContainer}>
     
         <Text style={formStyles.title}>START PLANNING THE BEST DAY OF YOUR LIFE</Text>
         <View style={formStyles.inputWrapper}>
            <TextInput
            onChangeText={handleChange('first_name')}
            onBlur={handleBlur('first_name')}
            value={values.first_name}
            placeholderTextColor="white"
            placeholder="first name..."
            style={formStyles.inputStyle}
            />
         </View>
         {errors.first_name && touched.first_name ? (
             <Text style={{color:"#b31240", fontStyle:"italic", backgroundColor:"white", width:"50%",}}>{errors.last_name}</Text>
           ) : null}
           <View style={formStyles.inputWrapper}>
            <TextInput
            onChangeText={handleChange('last_name')}
            onBlur={handleBlur('last_name')}
            value={values.last_name}
            placeholderTextColor="white"
            placeholder="last name ..."
            style={formStyles.inputStyle}
            />
         </View>
         {errors.last_name && touched.last_name ? (
             <Text style={{color:"#b31240", fontStyle:"italic", backgroundColor:"white", width:"50%",}}>{errors.last_name}</Text>
           ) : null}
           <View style={formStyles.inputWrapper}>
            <TextInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholderTextColor="white"
            placeholder="email.."
            style={formStyles.inputStyle}
            />
         </View>
         {errors.email && touched.email ? (
             <Text style={{color:"#b31240", fontStyle:"italic", backgroundColor:"white", width:"50%",}}>{errors.last_name}</Text>
           ) : null}

         <RegularButton  
          onPress={()=> handleSubmit()} 
          btnStyles={{"backgroundColor":"white"}}
          textStyles={{fontWeight:"bold", color:`${colors.darkgreen}`}}
         >
          CREATE ACCOUNT</RegularButton>

       </View>
     )}
    </Formik>
    );
};

const formStyles = StyleSheet.create({
   
     formContainer : {
        // backgroundColor: `${colors.lightgreen}`,
        padding: 20,
        marginTop: 50,
        borderRadius: 50,
        width: '80%',
        
        
    
     },
     title : {
        color: `white`,
        fontSize: 42,
        lineHeight: 60,
        fontWeight: 'bold',
        marginBottom: 15,
        opacity: 1,
     },
     inputWrapper: {
        marginBottom: 15,
     },
     inputStyle: {
        borderColor: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        borderWidth: 1,
        borderRadius: 50,
        padding: 10,
        color:'white',
     }
})

export default NewUser;