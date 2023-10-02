import React from "react";
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import RegularButton from "./Buttons/RegularButton";
import styled from "styled-components/native";
import { colors } from "./colors";


const InputView = styled.TextInput`
align-items: center;
background-color: ${colors.lightgreen};
width: 80%;
padding: 20px;
margin: 10px auto;
border-radius: 50px;
`

const NewToDo = () => (
    <Formik
        initialValues={{name:""}}
        onSubmit={values => console.log(values)}
    >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View>
        <InputView>
         <TextInput
           onChangeText={handleChange('name')}
           onBlur={handleBlur('name')}
           value={values.name}
           placeholder="what's next on the list?"
           
         />
         </InputView>
         <RegularButton onPress={handleSubmit} title="Submit">Submit</RegularButton>
       </View>
     )}
    </Formik>
)




export default NewToDo;