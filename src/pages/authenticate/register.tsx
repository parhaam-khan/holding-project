import AuthLayout from "@/components/AuthLayout";
import styles from './auth.module.scss'
import styles2 from '@/components/textFields//textFields.module.scss'
import Image from "next/image";
import TextFieldIcon from "@/components/textFields/TextFieldIcon";
import { useEffect, useState } from "react";
import cs from 'classnames'
import { API } from "@/services/request-http";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import Link from "next/link";


const Register = () => {
    const router = useRouter();
    const{isLogin} = useAuth();
    const[state,setState] = useState<{
        msisdn:string,
    }>({
        msisdn:"",
    })
    const{msisdn} = state;

    useEffect(() => {
        if(isLogin()){
            router.replace(`/profile`)
        }
    },[])

    const handleOnChange = (e:any) => {
        setState({...state,[e.target.name]: e.target.value})
        }

        const registerHandler = async() => {
            const dataObj = {
                msisdn,
            }
            const header = {
                'Content-Type':"text/plain"
            }
        const data = JSON.stringify(dataObj);
        try{
            const res = await API('register','post',data,header)
            router.push({
                pathname: '/authenticate/otp',
                query: { phoneNum:msisdn }
            })
        }catch(err:any){
            console.log(err.response.data.message);
        }
        }


    return ( 
        <AuthLayout>
         <div className={styles.login}>
            <div className={styles.title}>
                <p>
                ثبت نام
                </p>
            </div>
            <div className={styles.inputs}>
            <div className={styles['text-field']}>
            <TextFieldIcon
             inputName="msisdn"
             value={msisdn}
             imgSrc="../icons/phone-icon.svg"
             imgAlt="phone icon"
             label='شماره همراه'
             type="tel"
             handleOnChange={handleOnChange}
             />
            </div>
            </div>
            <div style={{marginTop:"20px"}} className={styles.btn}>
                <button onClick={registerHandler}>
                ثبت نام
                </button>
            </div>
        <div className={styles['register-text']}>
            <p>
                حساب کاربری دارید؟
            </p>
            <Link href={'/authenticate/login'}>
                <p>
                وارد شوید
                </p>
            </Link>
        </div>
        </div>
        </AuthLayout>
     );
}
 
export default Register;