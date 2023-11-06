import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { User } from "../components/User";
import ToDo from "../components/ToDo";

interface AuthProps {
    authState?: {token:string | null; authenticated:boolean | null};
    onSignUp?: (email:string, password:string, first_name:string, last_name:string) => Promise<any>;
    onLogin?:(email:string, password:string) => Promise<any>;
    onLogout?:()=>Promise<any> |Promise<void>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = "http://192.168.1.14:5555"

const AuthContext = createContext<AuthProps>({});

// export this to be used like a hook!
export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}:any) => {
    const [authState, setAuthState] = useState<{
        token:string | null;
        authenticated: boolean | null;
    }>({
        token:null,
        authenticated:null
    })

    const [user, setUser] = useState<User>({
        first_name: "",
        last_name: "",
        id: 0,
        email: "",
        todos: [],
        password:"",
    })

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            // console.log(token)
            

            if(token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                setAuthState({
                    token:token,
                    authenticated:true
                })
            }
        }

        loadToken();
    })

    const register = async (email:string, password:string, first_name:string, last_name:string) => {
        try {
            return await axios.post(`${API_URL}/users`, {email, password, last_name, first_name});
        } catch (e) {
            return {error: true, msg: (e as any).response.data.msg};
        }
    }

    const login = async (email:string, password:string) => {
        try {
            const result = await axios.post(`${API_URL}/login`, {email,password})
            // console.log("file: AuthContext.tsx:41 ~ login ~ 🔐 Here's your value 🔐 \n:", result)
            setAuthState({
                token:result.data.token,
                authenticated: true
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token)

            return result 

        } catch (e) {
            return {error: true, msg:(e as any).response.data.msg}
        }
    }

    const logout = async () => {
        // delete token from storage
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        console.log("logging out...")

        //update HTTP axios headers
        axios.defaults.headers.common['Authorization'] = "";

        //reset auth state
        setAuthState({
            token:null,
            authenticated:false,
        })
    }

    const value ={
        onRegister: register,
        onLogin:login,
        onLogout:logout,
        authState
    }
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}