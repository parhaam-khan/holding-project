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

const Login = () => {
    const router = useRouter();
    const{isLogin} = useAuth();
    const[merchantId,setMerchantId] = useState('');
    const[showPass,setShowPass] = useState(false)
    const[state,setState] = useState<{
        msisdn:string,
        password:string
    }>({
        msisdn:"",
        password:""
    })
    const{msisdn,password} = state;

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('holdingInfo')  || '{}') 
        if(isLogin()){
            router.replace(`/profile`)
        }else{
            setMerchantId(data.id)
        }
    },[])

    const handleOnChange = (e:any) => {
    setState({...state,[e.target.name]: e.target.value})
    }

    const showPasswordHandler = () => {
        setShowPass(!showPass)
    }

    const loginHandler = async() => {
        const dataObj = {
            username:msisdn,
            password
        }
    const data = JSON.stringify(dataObj);
    try{
        const res = await API('login','post',data)
        const{data:{token}} = res;
        localStorage.setItem("token",JSON.stringify(token))
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
                ورود
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
          <div className={styles['text-field']}>
          <TextFieldIcon
             inputName="password"
             imgSrc="../icons/lock-icon.svg"
             imgAlt="phone icon"
             label='رمز ورود'
             type={!showPass && "password"}
             value={password}
             autoComplete="new-password"
             endIconNode={
                <Image
                className={cs(styles2.icon,styles2['end-icon'])}
                src='../icons/hide-pass-icon.svg'
                alt='hide pass icon'
                onClick={showPasswordHandler}
                width={24}
                height={24}
                priority
              />
             }
             handleOnChange={handleOnChange}
             endIcon
             />
             <div className={styles['fotget-pass-text']}>
          <p>
            رمز ورود را فراموش کرده ام
          </p>
          </div>
          </div>
          
            </div>
            <div className={styles.btn}>
                <button onClick={loginHandler}>
                ورود
                </button>
            </div>
        <div className={styles['register-text']}>
            <p>
                حساب کاربری ندارید؟
            </p>
            <Link href={'/authenticate/register'}>
                <p>
                عضو شوید
                </p>
            </Link>
        </div>
        </div>
        </AuthLayout>
     );
}
 
export default Login;