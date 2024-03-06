import { isEmpty } from "@/helper";
import { useRouter } from "next/router";

const useAuth = () => {
const router = useRouter();

const isLogin = () => {
    if(typeof window !== 'undefined'){
        const merchantToken = localStorage.getItem('token') || {}
        if(isEmpty(merchantToken)){
            return false
        }else{
            return true
        } 
    }
}

 const validateToken = (status:any) => {
    if(status && status === 403){
      localStorage.removeItem('token')
      router.push('/authenticate/login')
    }
      }


    return{
        isLogin,
        validateToken
    };
}
 
export default useAuth;