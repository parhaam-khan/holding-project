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
import LoadingCircle from "@/components/loading/loading-circle";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { isEmpty } from "@/helper";

const Recovery = () => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const merchantId = useSelector((state:any) => state.holding.holdingInfo.id);
    const[loading,setLoading] = useState(false);
    const[textFieldError,setTextFieldError] = useState<{[key:string]:string}>({});
    const[apiError,setApiError] = useState({
        isError:false,
        errorMsg:""
    });
    // console.log(loading);
    const[state,setState] = useState<{
        msisdn:string,
    }>({
        msisdn:"",
    })
    const{msisdn} = state;
    const{isError,errorMsg} = apiError;

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


    const recoveryHandler = async() => {
        const [error, textFieldError] = valid();
        setTextFieldError(error);

        if(!textFieldError){
            setLoading(() => true)
            const dataObj = {
                 msisdn,
            }
        const data = JSON.stringify(dataObj);
        const header = {
            'Content-Type':"text/plain"
        }
        try{
            const res = await API('forgotPassword','post',data,header)
            router.push({
                pathname: `/${merchantId}/authenticate/changePassword`,
                query: { phoneNum:msisdn }
            })
        }catch(err:any){
            err.response && enqueueSnackbar(err.response.data.message, { variant: 'error',hideIconVariant:true});
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
                بازیابی / تغییر رمز عبور
                </p>
            </div>
            <div className={styles['sub-title']}>
                <p>
                    برای بازیابی رمز عبور 
                    <span className={styles.phoneNum}>
                    {" "}  شماره موبایل  {" "}
                    </span>
                    {" "}  خود را وارد نمایید {" "}
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
             isError={!isEmpty(textFieldError.msisdn) || isError}
             errorMsg={textFieldError.msisdn || errorMsg}
             />
            </div>
            </div>
            <div className={styles.btn}>
                <button onClick={recoveryHandler}>
                ارسال کد فعال سازی
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
        <Link href={`/${merchantId}`} className={styles['back-home']}>
                <p>
                 بازگشت به صفحه اصلی
                </p>
            </Link>
        </div>
        </AuthLayout>
     );
}
 
export default Recovery;