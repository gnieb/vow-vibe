import React, {FunctionComponent, useState} from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import RegularButton from "../Buttons/RegularButton";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { colors } from "../colors";

const API_URL = "https://google.com"

let initialValues = {
    email:"",
    password:""
}

const ReturnUserSchema = Yup.object().shape({
    email: Yup.string()
    .email('Invalid Email').required('Please Enter Your Email'),
    password: Yup.string()
    .required('Please Enter Your Password')
  });


const ReturnUser:FunctionComponent = () => {
    const [noMatch, setNoMatch] = useState<boolean>(false)

    const tryLoggingIn = (values:any) => {
        fetch(API_URL, {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values)
        })
        .then(handleResponse)
    }

    const handleResponse = (r:any) => {
        if(r.ok){
            console.log("logging in..")
            // set user using context


        } else {
            console.log("STATUS:", r.status)
            setNoMatch(true)
            setTimeout(() => {
                setNoMatch(false)
            }, 7000)
            }
        }


    return (
        <Formik 
        initialValues={initialValues}
        validationSchema={ReturnUserSchema}
        onSubmit={(val, {resetForm}) => {
            console.log(val)
            tryLoggingIn(val)
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
               {noMatch ? (<Text style={{color:"white", fontWeight:"900", fontStyle:"italic", width:"100%",}}>Email and Password do not match.</Text>)
               : null }
     
              <RegularButton  
               onPress={()=> handleSubmit()} 
               btnStyles={{"backgroundColor":"white"}}
               textStyles={{fontWeight:"bold", color:`${colors.darkgreen}`}}
              >
               LOG IN</RegularButton>
     
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