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
import moment from "jalali-moment";
import { isEmpty } from "@/helper";

const ChangePassword = () => {
    const router = useRouter();
    console.log('State on render', useStore().getState());
    const merchantId = useSelector((state:any) => state.holding.holdingInfo.id);
    const[textFieldError,setTextFieldError] = useState<{[key:string]:string}>({});
    const[showPass,setShowPass] = useState(false);
    const[loading,setLoading] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

const deadlineTime = moment().add(2,'m').add(2,'s').toDate()

    const getTime = (deadline:any) => {
        const time = Date.parse(deadline) - Date.now();
       if(time > 0) {
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
       }
      };

    useEffect(() => {
            const interval = setInterval(() => getTime(deadlineTime), 1000);
            return () => clearInterval(interval);
      }, []);

    const[apiError,setApiError] = useState({
        isError:false,
        errorMsg:""
    });
    // console.log(loading);
    const[state,setState] = useState<{
        code:string,
        password:string,
    }>({
        code:"",
        password:"",
    })
    const{code,password} = state;
    const{isError,errorMsg} = apiError;

    const handleOnChange = (e:any) => {
    setState({...state,[e.target.name]: e.target.value})
    }

    const showPasswordHandler = () => {
        setShowPass(!showPass)
    }

    const valid  = ():any[] => {
        interface errorTypes {
            [key:string]: string
        }
        const error:errorTypes = {}

        if (isEmpty(code)) {
            error.code = 'لطفا کد پیامک شده را وارد کنید'
        }
        if (isEmpty(password)) {
            error.password = 'لطفا رمز ورود جدید را وارد کنید';
        }
        const textFieldError = Object.keys(error).length > 0 ? true : false
        return [error, textFieldError]
    }

    const changePassHandler = async() => {
        const [error, textFieldError] = valid();
        setTextFieldError(error);
        if(!textFieldError){
            setLoading(() => true);
            const dataObj = {
                msisdn: router.query.phoneNum,
                 otp: code,
                  passwd: password 
            }
        const data = JSON.stringify(dataObj);
        try{
            const res = await API('validateWithPassword','post',data)
            setLoading(false)
            router.push(`/${merchantId}/authenticate/login`)
            if(isError){
                setApiError({isError: false, errorMsg: ''});
            }
        }catch(err:any){
            setApiError({isError: true, errorMsg: err?.response?.data?.message});
            setLoading(false)
        }
        }
    }

    return ( 
        <AuthLayout>
            {loading ? <LoadingCircle/> : ''}
        <div className={styles.login}>
            <div className={styles.title}>
                <p>
                تایید شماره موبایل 
                </p>
            </div>
            <div className={styles.inputs}>
            <div className={styles['text-field']}>
            <TextFieldIcon
             inputName="code"
             value={code}
             label={`کد تایید پیامک شده به شماره ${router.query.phoneNum} را وارد نمایید`}
             type="tel"
             handleOnChange={handleOnChange}
             isError={!isEmpty(textFieldError.code) || isError}
             errorMsg={textFieldError.code || errorMsg}
             />
            </div>
          <div className={styles['text-field']}>
          <TextFieldIcon
             inputName="password"
             label='رمز ورود جدید'
             type={!showPass && "password"}
             value={password}
             autoComplete="new-password"
             isError={!isEmpty(textFieldError.password) || isError}
             errorMsg={textFieldError.password || errorMsg}
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
          </div>
            </div>
            <div className={styles.btn}>
                <button onClick={changePassHandler}>
                تایید شماره موبایل و تغییر رمز ورود
                </button>
            </div>
        {/* <div className={styles['register-text']}>
            <p>
                حساب کاربری ندارید؟
            </p>
            <Link href={`/${merchantId}/authenticate/register`}>
                <p>
                عضو شوید
                </p>
            </Link>
        </div> */}
        <div className={styles['send-code']}>
        <div className={styles['send-code-text']}>
            <p>
                ارسال مجدد کد تایید
            </p>
            <div className={styles.timer}>
             {`${seconds < 10 ? '0' + seconds : seconds} : 0${minutes}`}
            </div>
        </div>
        </div>
        <div className={styles['footer-buttons']}>
        <Link href={`/${merchantId}/authenticate/recovery`} className={styles['back-home']}>
                <p>
            تغییر شماره موبایل
                </p>
            </Link>
        <Link href={`/${merchantId}`} className={styles['back-home']}>
                <p>
                 بازگشت به صفحه اصلی
                </p>
            </Link>
        </div>
       
        </div>
        </AuthLayout>
     );
}
 
export default ChangePassword;