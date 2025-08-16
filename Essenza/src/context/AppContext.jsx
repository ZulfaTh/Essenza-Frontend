import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider =(props)=>{


    //unless we add this every time refresh the page it will logout automatically.so we have to send cookies via this
    axios.defaults.withCredentials=true;
   
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [isLoggedin,setIsLoggedin]=useState(false);
    const [userData,setUserData]=useState(false);

    const getAuthState=async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/is-authenticated')

            if(data.success){
                setIsLoggedin(true)
                getUserData()
            }
        } catch (error) {
            toast.error(error.message)
        } 
        
    }

    const getUserData=async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/data')
            data.success ?  setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    //whenever web page loaded this will check for user logged in or not
    useEffect(()=>{
        getAuthState();
    },[])
    

    const value = {
         backendUrl,
         isLoggedin, setIsLoggedin,
         userData, setUserData,
         getUserData

    }

    return <AppContent.Provider value={value}>
        {props.children}
    </AppContent.Provider>
}