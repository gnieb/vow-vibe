import React, {FunctionComponent} from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import RegularButton from "../Buttons/RegularButton";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { colors } from "../colors";


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
        >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched  }) => (
            <View style={formStyles.formContainer}>
          
              <Text style={formStyles.title}>WELCOME BACK</Text>
              <View style={formStyles.inputWrapper}>
                 <TextInput
                 onChangeText={handleChange('email')}
                 onBlur={handleBlur('email')}
                 value={values.email}
                 placeholderTextColor="white"
                 placeholder="email..."
                 style={formStyles.inputStyle}
                 />
              </View>
              {errors.email && touched.email ? (
                  <Text style={{color:"white", fontWeight:"900", fontStyle:"italic", width:"100%",}}>{errors.email}</Text>
                ) : null}
                <View style={formStyles.inputWrapper}>
                 <TextInput
                 onChangeText={handleChange('password')}
                 onBlur={handleBlur('password')}
                 value={values.password}
                 placeholderTextColor="white"
                 placeholder="password ..."
                 style={formStyles.inputStyle}
                 />
              </View>
              {errors.password && touched.password ? (
                  <Text style={{color:"white", fontWeight:"900", fontStyle:"italic", width:"100%",}}>{errors.password}</Text>
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
             margin: 10,
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
     
     export default ReturnUser;