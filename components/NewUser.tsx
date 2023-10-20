import React, { FunctionComponent } from "react";
import { TextInput, View, StyleSheet } from 'react-native';
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
      .required('Required'),
    last_name: Yup.string()
    .min(2, 'Too Short!')
    .required('Required!'),
    email: Yup.string()
    .email('Invalid Email').required('Required!')
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
     
         <RegText textStyles={formStyles.title}>SIGN UP TO START PLANNING THE BEST DAY OF YOUR LIFE</RegText>
         <View style={formStyles.inputWrapper}>
            <TextInput
            onChangeText={handleChange('first_name')}
            onBlur={handleBlur('first_name')}
            value={values.first_name}
            placeholder="first name..."
            style={formStyles.inputStyle}
            />
         </View>
         {errors.first_name && touched.first_name ? (
             <RegText>{errors.first_name}</RegText>
           ) : null}
           <View style={formStyles.inputWrapper}>
            <TextInput
            onChangeText={handleChange('last_name')}
            onBlur={handleBlur('last_name')}
            value={values.last_name}
            placeholder="last name ..."
            style={formStyles.inputStyle}
            />
         </View>
         {errors.last_name && touched.last_name ? (
             <RegText>{errors.last_name}</RegText>
           ) : null}
           <View style={formStyles.inputWrapper}>
            <TextInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder="email.."
            style={formStyles.inputStyle}
            />
         </View>
         {errors.email && touched.email ? (
             <RegText>{errors.email}</RegText>
           ) : null}

         <RegularButton  onPress={()=> handleSubmit()} >Sign up!</RegularButton>

       </View>
     )}
    </Formik>
    );
};

const formStyles = StyleSheet.create({
   
     formContainer : {
        backgroundColor: `${colors.lightgreen}`,
        padding: 20,
        margin: 10,
        borderRadius: 50,
        width: '90%',
        flex: 1,
        
    
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

export default NewUser;