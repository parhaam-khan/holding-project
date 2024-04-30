import AuthLayout from "@/components/AuthLayout";
import styles from '@/styles/auth.module.scss'
import Image from "next/image";
import TextFieldIcon from "@/components/textFields/TextFieldIcon";
import { useEffect, useState } from "react";
import cs from 'classnames'
import { API } from "@/services/request-http";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { isEmpty } from "@/helper";
import LoadingCircle from "@/components/loading/loading-circle";


const Register = () => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const merchantId = useSelector((state:any) => state.holding.holdingInfo.id);
    const[textFieldError,setTextFieldError] = useState<{[key:string]:string}>({});
    const[loading,setLoading] = useState(false);
    // const{isLogin} = useAuth();
    const[state,setState] = useState<{
        msisdn:string,
    }>({
        msisdn:"",
    })
    const{msisdn} = state;

    // useEffect(() => {
    //     if(isLogin()){
    //         router.replace(`/profile`)
    //     }
    // },[])

    const handleOnChange = (e:any) => {
        setState({...state,[e.target.name]: e.target.value})
        }

        const valid  = ():any[] => {
            interface errorTypes {
                [key:string]: string
            }
            const error:errorTypes = {}
    
            if (isEmpty(msisdn)) {
                error.msisdn = 'لطفا شماره موبایل خود را وارد کنید';
            }
            const textFieldError = Object.keys(error).length > 0 ? true : false
            return [error, textFieldError]
        }

        const registerHandler = async() => {
            const [error, textFieldError] = valid();
            setTextFieldError(error);

            if(!textFieldError){
                setLoading(() => true)
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
                    pathname: `/${merchantId}/authenticate/otp`,
                    query: { phoneNum:msisdn }
                })
            }catch(err:any){
                setLoading(false)
                err.response && enqueueSnackbar(err.response.data.message, { variant: 'error',hideIconVariant:true});
            }
            }
        }


    return ( 
        <AuthLayout>
        {loading ? <LoadingCircle/> : ''}
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
             handleOnChange={handleOnChange}
             isError={!isEmpty(textFieldError.msisdn)}
             errorMsg={textFieldError.msisdn}
             imgSrc="../../icons/phone-icon.svg"
             imgAlt="phone icon"
             label='شماره همراه'
             type="tel"
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
            <Link href={`/${merchantId}/authenticate/login`}>
                <p>
                وارد شوید
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
 
export default Register;