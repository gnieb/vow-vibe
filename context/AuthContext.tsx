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
    user: User;
    setUser?: React.Dispatch<React.SetStateAction<User>>;
}

const TOKEN_KEY = 'my-jwt';
const USER_KEY = 'user-info';
export const API_URL = "http://192.168.1.6:5555"

const AuthContext = createContext<AuthProps>({user:{first_name:"", last_name:"", email:"", wedding:{wedding_date:""}}});

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
        id: undefined,
        email: "",
        todos: undefined,
        wedding: {wedding_date:""},
    })

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            const user = await SecureStore.getItemAsync(USER_KEY)
            console.log("useEffect authContext USER:",user)
        
            if(token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                setAuthState({
                    token:token,
                    authenticated:true
                })
            }

            if(user) {

                const userInfo = JSON.parse(user)
                // console.log("userInfo:", userInfo.first_name)
                axios.defaults.headers.common['Authorization'] = `Bearer ${user}`
                setUser({
                    first_name: userInfo.first_name,
                    last_name: userInfo.last_name,
                    id: userInfo.id,
                    email: userInfo.email,
                    todos: userInfo.todos,
                    wedding: userInfo.wedding
                })

                console.log("USER  UEFFECT IS:", user)
            }
        }

        loadToken();
    }, [])

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

            setUser({
                first_name: result.data.user.first_name,
                last_name: result.data.user.last_name,
                id: result.data.user.id,
                email: result.data.user.email,
                todos: result.data.user.todos,
                wedding: result.data.user.wedding
            })

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.user}`
            await SecureStore.setItemAsync(USER_KEY, JSON.stringify(result.data.user))
            // console.log("User:",user)
            return result 

        } catch (e) {
            console.log("Error during login", "e:", e)
            return {error: true, msg:(e as any).response.data.msg}
        }
    }

    const logout = async () => {
        // delete token from storage
        console.log("logging out...")
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        console.log("deleting user info token...")
        await SecureStore.deleteItemAsync(USER_KEY);
        
        //update HTTP axios headers
        axios.defaults.headers.common['Authorization'] = "";

        //reset auth state
        setAuthState({
            token:null,
            authenticated:false,
        })

        //reset User
        console.log("resetting user to undefined")
        setUser({
            first_name: "",
            last_name: "",
            id: undefined,
            email: "",
            todos: undefined,
            wedding: {wedding_date:""},
        })
    }

    const value = {
        onRegister: register,
        onLogin:login,
        onLogout:logout,
        authState,
        setUser,
        user,
    }
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}