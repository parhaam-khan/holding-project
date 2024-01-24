import AuthLayout from "@/components/AuthLayout";
import styles from './auth.module.scss'
import TextFieldIcon from "@/components/textFields/TextFieldIcon";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { API } from "@/services/request-http";

const Otp = () => {
    const router = useRouter();
    const{isLogin} = useAuth();
    const[otpCode,setOtpCode] = useState('');
    const[merchantId,setMerchantId] = useState('');
console.log(router);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('holdingInfo')  || '{}') 
            setMerchantId(data.id)
    },[])

    const handleOnChange = (e:any) => {
        setOtpCode(e.target.value)
        }

    const otpHandler = async() => {
        const dataObj = {
            otpCode,
        }
        const header = {
            'Content-Type':"text/plain"
        }
    const data = JSON.stringify(dataObj);
    try{
        const res = await API('validate','post',data,header)
        console.log(res);
         router.push(`/${merchantId}`)
    }catch(err:any){
        console.log(err.response.data.message);
    }
    }

    return ( 
        <AuthLayout>
        <div className={styles.login}>
           <div className={styles.title}>
               <p>
                تایید شماره موبایل
               </p>
           </div>
           <div className={styles['sub-title']}>
            <p>
                کد تایید به شماره
            </p>
            <p className={styles.phoneNum}>
                {router.query.phoneNum}
            </p>
                <p>
                پیامک شده است.
                </p>
           </div>
           <div className={styles.inputs}>
           <div className={styles['text-field-otp']}>
           <input
                name='otpCode'
                type= "number" 
                value={otpCode} 
                onChange={handleOnChange}
                 autoComplete='off'
                />
           </div>
           </div>
           <div style={{marginTop:"20px"}} className={styles.btn}>
               <button onClick={otpHandler}>
                تایید شماره موبایل
               </button>
           </div>
       </div>
       </AuthLayout>
     );
}
 
export default Otp;