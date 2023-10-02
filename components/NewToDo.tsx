import React from "react";
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import RegularButton from "./Buttons/RegularButton";

const NewToDo = () => (
    <Formik
        initialValues={{name:""}}
        onSubmit={values => console.log(values)}
    >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View>
         <TextInput
           onChangeText={handleChange('name')}
           onBlur={handleBlur('name')}
           value={values.name}
           placeholder="what's next on the list?"
           
         />
         <RegularButton onPress={handleSubmit} title="Submit">Submit</RegularButton>
       </View>
     )}
    </Formik>
)




export default NewToDo;