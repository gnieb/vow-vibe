import React, { FunctionComponent } from "react";
import { TextInput, View, StyleSheet, Text, Pressable } from 'react-native';
import { Formik } from 'formik';
import RegularButton from "./Buttons/RegularButton";
import { colors } from "./colors";
import { User } from "./User";
import { useState } from "react";
import * as Yup from 'yup';
import { API_URL } from "../assets/API";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useAuth } from "../context/AuthContext";

let initialValues = {
    first_name: "",
    last_name:"",
    email:"",
    password:""
}

const NewUserSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'Too Short!')
      .required('Please enter your first name'),
    last_name: Yup.string()
    .min(2, 'Too Short!')
    .required('Please enter your last name'),
    email: Yup.string()
    .email('This is not a valid email address').required('Please enter your email'),
    password: Yup.string()
    .required('Please Enter Your Password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
  });

// I actually don't use the secure storage for this.. did NOT use the onRegister from useAuth()
// which is fine. once a new user is registered, they're redirected to the login page.

const NewUser:FunctionComponent = () => {
  const [isDateSet, setIsDateSet] = useState(false)
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false)
  const [wedDate, setWedDate] = useState<Date>(new Date())
  const {user} = useAuth()
  const [notUnique, setNotUnique] = useState(false)

  const handleDateCancel = () => { 
      setDatePickerVisible(false); 
  }

  
  const handleResponse = (r:any) => {
    if (r.ok){
      r.json().then((resp:any) => {
        console.log("Successfully created!", resp)
      })
    } else {
      console.log("STATUS:", r.status)
      setNotUnique(true)
      setTimeout(() => {
        setNotUnique(false)
      }, 7000)

    }
  }

    const createNewUser = (value:any) => {
      fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(value)
      })
      .then(handleResponse)
    }

    const createWeddingAssociated = async (newWedding:Wedding) => {
        try {
          const response = await fetch(`${API_URL}/weddings`, {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(newWedding)
          })
        } catch (e) {
          return {error: true, msg: (e as any).response.data.msg};
        }
      }

      const handleDateConfirm = (date:any) => {
            // POST to database!
            const newWed = {
              wedding_date: date,
              user_id: user.id
            }
          createWeddingAssociated(newWed)
          console.log("date passed into handleDateConfirm:",date)
          // example : 2023-11-24T15:19:00.000Z
          setWedDate(date)
          setDatePickerVisible(false);
          setIsDateSet(true) 
          }
    
          return (
        <Formik
        initialValues={initialValues}
        validationSchema={NewUserSchema}
        onSubmit={(val, {resetForm}) => {
            // console.log(val)
            const newUser:User = {email:val.email, first_name: val.first_name, last_name: val.last_name, todos: [], password:val.password, wedding:{wedding_date:""}}
            // POST new User to server/database:
            createNewUser(val)
            // console.log(newUser)
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
             <Text style={{color:"white", fontWeight:"900", fontStyle:"italic", width:"100%",}}>{errors.last_name}</Text>
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
             <Text style={{color:"white", fontWeight:"900", fontStyle:"italic", width:"100%",}}>{errors.last_name}</Text>
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
             <Text style={{color:"white", fontWeight:"900", fontStyle:"italic", width:"100%",}}>{errors.email}</Text>
           ) : null}
        {notUnique ? 
           <Text >
                Username is already taken
            </Text> : 
            <></> 
        }

        <View style={formStyles.inputWrapper}>
            <TextInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholderTextColor="white"
            placeholder="create a password.."
            style={formStyles.inputStyle}
            />
         </View>
         {errors.password && touched.password ? (
             <Text style={{color:"white", fontWeight:"900", fontStyle:"italic", width:"100%",}}>{errors.password}</Text>
           ) : null}
          <Pressable
                onPress={() => setDatePickerVisible(true)}
                style={{ padding:10, borderColor:"white", borderWidth: 1, borderRadius:50}}
                >
                <Text style={{fontWeight:"bold", color:"white", fontSize:20}}>{isDateSet ? wedDate.toUTCString() : "set your date"}</Text>
          </Pressable>
              <DateTimePickerModal 
                    isVisible={datePickerVisible} 
                    display="inline"
                    mode="datetime"
                    onConfirm={handleDateConfirm} 
                    onCancel={handleDateCancel} 
                    timeZoneOffsetInMinutes={0}
                  /> 
      {  isDateSet ? 
            <RegularButton  
              onPress={()=> handleSubmit()} 
              btnStyles={{"backgroundColor":"white"}}
              textStyles={{fontWeight:"bold", color:`${colors.darkgreen}`}}
            >
          CREATE ACCOUNT</RegularButton>   :
            <RegularButton  
              onPress={()=> {}} 
              btnStyles={{"backgroundColor":"white"}}
              textStyles={{fontWeight:"bold", color:`${colors.darkgreen}`}}
            >
          Set your wedding date, first!</RegularButton>  }

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