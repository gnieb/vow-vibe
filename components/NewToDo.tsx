import React from "react";
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import RegularButton from "./Buttons/RegularButton";
import styled from "styled-components/native";
import { colors } from "./colors";
import RegText from "./Texts/RegText";


// const InputView = styled.TextInput`
// align-items: center;
// display: block;
// background-color: ${colors.lightgreen};
// padding: 20px;
// margin: 10px auto;
// border-radius: 50px;
// `

const NewToDo = () => (
    <Formik
        initialValues={{name:""}}
        onSubmit={values => console.log(values)}
    >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View style={formStyles.formContainer}>
         <RegText textStyles={formStyles.title}>What's Next on the List?</RegText>
         <View style={formStyles.inputWrapper}>
            <TextInput
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            placeholder="add it to the pile..."
            style={formStyles.inputStyle}
            />
         </View>
         <RegularButton style={formStyles.title} onPress={handleSubmit} title="Submit">Submit</RegularButton>
       </View>
     )}
    </Formik>
)

const formStyles = StyleSheet.create({
   
     formContainer : {
        backgroundColor: `${colors.lightgreen}`,
        padding: 20,
        borderRadius: 50,
        width: '100%',
    
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



export default NewToDo;