import { isEmpty } from "@/helper";
import { useEffect, useState } from "react";

const useAuth = () => {

const isLogin = () => {
    if(typeof window !== 'undefined'){
        const getToken = JSON.parse(localStorage.getItem('token') || '{}')
        console.log(getToken);
        if(!isEmpty(getToken)){
            return true
        }else return false
    }
}


    return{
        isLogin
    };
}
 
export default useAuth;