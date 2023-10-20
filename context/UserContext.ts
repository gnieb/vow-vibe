import React, { useContext, createContext, useState } from "react";
import { User } from "../components/User";

export type GlobalUser = {
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>
}


export const UserContext = createContext<GlobalUser>({
    user: 
    {first_name:"",
    last_name:"",
    email:"",
    todos: [],},
//  is 'ID' needed?? undefined might not work here..... 
    setUser: 
    () => {}
})


export const UseUserContext = () => useContext(UserContext)



