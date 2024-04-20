import AuthLayout from "@/components/AuthLayout";
import styles from '@/styles/auth.module.scss'
import styles2 from '@/components/textFields//textFields.module.scss'
import Image from "next/image";
import TextFieldIcon from "@/components/textFields/TextFieldIcon";
import { useEffect, useState } from "react";
import cs from 'classnames'
import { API } from "@/services/request-http";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import Link from "next/link";
import LoadingCircle from "@/components/loading/loading-circle";
import { useSelector, useStore } from "react-redux";

const Login = () => {
    const router = useRouter();
    console.log('State on render', useStore().getState());
    const merchantId = useSelector((state:any) => state.holding.holdingInfo.id);
    // const[merchantId,setMerchantId] = useState('');
    const[showPass,setShowPass] = useState(false);
    const[loading,setLoading] = useState(false);
    const[apiError,setApiError] = useState({
        isError:false,
        errorMsg:""
    });
    // console.log(loading);
    const[state,setState] = useState<{
        msisdn:string,
        password:string
    }>({
        msisdn:"",
        password:""
    })
    const{msisdn,password} = state;
    const{isError,errorMsg} = apiError;

    // useEffect(() => {
    //     const data = JSON.parse(localStorage.getItem('holdingInfo')  || '{}') 
    //         setMerchantId(data.id)
    // },[])

    const handleOnChange = (e:any) => {
    setState({...state,[e.target.name]: e.target.value})
    }

    const showPasswordHandler = () => {
        setShowPass(!showPass)
    }

    const loginHandler = async() => {
        setLoading(() => true)
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
        setLoading(false)
        if(isError){
            setApiError({isError: false, errorMsg: ''});
        }
    }catch(err:any){
        setApiError({isError: true, errorMsg: err?.response?.data?.message});
        setLoading(false)
    }
    }

    return ( 
        <AuthLayout>
            {loading ? <LoadingCircle/> : ''}
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
             imgSrc="../../icons/phone-icon.svg"
             imgAlt="phone icon"
             label='شماره همراه'
             type="tel"
             handleOnChange={handleOnChange}
             isError={isError}
             errorMsg={errorMsg}
             />
            </div>
          <div className={styles['text-field']}>
          <TextFieldIcon
             inputName="password"
             imgSrc="../../icons/lock-icon.svg"
             imgAlt="phone icon"
             label='رمز ورود'
             type={!showPass && "password"}
             value={password}
             autoComplete="new-password"
             isError={isError}
             errorMsg={errorMsg}
             endIconNode={
                <Image
                className={cs(styles2.icon,styles2['end-icon'])}
                src={showPass ? '../../icons/show-pass-icon.svg' : '../../icons/hide-pass-icon.svg'}
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
             {/* <div className={styles['fotget-pass-text']}>
          <p>
            رمز ورود را فراموش کرده ام
          </p>
          </div> */}
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
            <Link href={`/${merchantId}/authenticate/register`}>
                <p>
                عضو شوید
                </p>
            </Link>
        </div>
        <Link href={`/${merchantId}`} className={styles['back-home']}>
                <p>
                 بازگشت به صفحه اصلی
                </p>
            </Link>
        </div>
        </AuthLayout>
     );
}
 
export default Login;