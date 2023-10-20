import React, { useContext, createContext, useState } from "react";
import { User } from "../components/User";

export const UserContext = createContext<User>({
    first_name:"",
    last_name:"",
    email:"",
    todos: [],
    id: undefined
    // undefined might not work here..... 
})


export const UseUserContext = () => useContext(UserContext)



