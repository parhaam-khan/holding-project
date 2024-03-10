import { isEmpty } from "@/helper";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const useAuth = () => {
const router = useRouter();
const merchantId = useSelector((state:any) => state.holding.holdingInfo.id);

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
      router.push(`/${merchantId}/authenticate/login`)
    }
      }


    return{
        isLogin,
        validateToken
    };
}
 
export default useAuth;