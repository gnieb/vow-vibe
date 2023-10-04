import React, { FunctionComponent } from "react";
import { TextInput, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import RegularButton from "./Buttons/RegularButton";
import styled from "styled-components/native";
import { colors } from "./colors";
import RegText from "./Texts/RegText";
import ToDo from "./ToDo";
import { useState } from "react";
import * as Yup from 'yup';
import uuid from 'react-native-uuid';


// const InputView = styled.TextInput`
// align-items: center;
// display: block;
// background-color: ${colors.lightgreen};
// padding: 20px;
// margin: 10px auto;
// border-radius: 50px;
// `

const ToDoSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .required('Required'),
  });


interface FormProps {
    setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>,
    todos: ToDo[]
}

const NewToDo:FunctionComponent<FormProps> = ({setTodos, todos}) => {
    // const [todo, setTodo] = useState<ToDo>()
    console.log(Date.now())

    const initialValues = {
        name:""
    }

    return (
    <Formik
        initialValues={initialValues}
        validationSchema={ToDoSchema}
        onSubmit={(val, {resetForm}) => {
            console.log(val)
            const newTask:ToDo = {id: Date.now(), isDone:false, todo: val.name,}
            setTodos(todos => [...todos, newTask])
            resetForm({values: initialValues})
        }}
    >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched  }) => (
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
         {errors.name && touched.name ? (
             <RegText>{errors.name}</RegText>
           ) : null}
         <RegularButton  onPress={()=> handleSubmit()} >Submit</RegularButton>

       </View>
     )}
    </Formik>
    );
};

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



export default NewToDo;