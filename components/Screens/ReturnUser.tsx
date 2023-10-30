import React, {FunctionComponent} from "react";
import { Text, StyleSheet } from "react-native";
import * as Yup from 'yup';
import { Formik } from 'formik';


let initialValues = {
    email:"",
    password:""
}

const ReturnUserSchema = Yup.object().shape({
    email: Yup.string()
    .email('Invalid Email').required('Please Enter Your Email'),
    password: Yup.string()
    .required('Please Enter Your Password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
  });


const ReturnUser:FunctionComponent = () => {
    return (
        <Formik 
        initialValues={initialValues}
        validationSchema={ReturnUserSchema}
        onSubmit={(val, {resetForm}) => {
            console.log(val)
            resetForm({values: initialValues})
        }}
        />

    )
}