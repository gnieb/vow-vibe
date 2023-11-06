import { FunctionComponent } from "react";
import { View, Text } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';

let initialValues = {
    wedding_date: "",
    user_id:""
}




const NewWedding:FunctionComponent = () => {
    return (
        <View>
            <Text>Wedding form here</Text>
        </View>
    )
}

export default NewWedding;
