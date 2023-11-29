import React, { FunctionComponent } from "react";
import { TextInput, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import RegularButton from "./Buttons/RegularButton";
import { colors } from "./colors";
import RegText from "./Texts/RegText";
import ToDo from "./ToDo";
import * as Yup from 'yup';
import { API_URL } from "../assets/API";
import { useAuth } from "../context/AuthContext";

const ToDoSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .required('Required'),
  });

interface FormProps {
    setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>,
    todos: ToDo[],
    addNew: (newT: ToDo) => void
}

const NewToDo:FunctionComponent<FormProps> = ({setTodos, todos, addNew}) => {
    const {user} = useAuth()
    // const [todo, setTodo] = useState<ToDo>()
    const initialValues = {
        name:""
    }

    const createNew = async (newT:ToDo) => {
      try {
        const response = await fetch(`${API_URL}/todos`, {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(newT)
        })
        addNew(newT)
      } catch (e) {
        return {error: true, msg: (e as any).response.data.msg};
      }
    }

    return (
    <Formik
        initialValues={initialValues}
        validationSchema={ToDoSchema}
        onSubmit={(val, {resetForm}) => {
            console.log(val)
            const newTask:ToDo = {id: Date.now(), isDone:false, todo: val.name, user_id:user.id}
            createNew(newTask)
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
      backgroundColor:"white", 
      padding: 20,
      borderRadius: 50,
      width: '90%',
      marginTop:30,
  
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