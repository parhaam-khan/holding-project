import AuthLayout from "@/components/AuthLayout";
import styles from '@/styles/auth.module.scss'
import TextFieldIcon from "@/components/textFields/TextFieldIcon";
import styles2 from '@/components/textFields//textFields.module.scss'
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { API } from "@/services/request-http";
import InputMask from "react-input-mask";
import OTPInput from "react-otp-input";
import Image from "next/image";
import cs from 'classnames';
import { useSnackbar } from "notistack";
import Link from "next/link";
import { useSelector } from "react-redux";

const Otp = () => {
    const merchantId = useSelector((state:any) => state.holding.holdingInfo.id);
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const[otpCode,setOtpCode] = useState('');
    const[password,setPassword] = useState('');
    const[showPass,setShowPass] = useState(false)


    const showPasswordHandler = () => {
        setShowPass(!showPass)
    }

    const otpHandler = async() => {
        const dataObj = {
            otp:otpCode,
            passwd:password,
            msisdn:router.query.phoneNum ?? null,
        }
    const data = JSON.stringify(dataObj);
    try{
        const res = await API('validateWithPassword','post',data)
        console.log(res);
        localStorage.setItem('token', res?.data?.token);
         router.push(`/authenticate/success-register`)
    }catch(err:any){
        err.response && enqueueSnackbar(err.response.data.message, { variant: 'error',hideIconVariant:true});
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
           <OTPInput
      value={otpCode}
      onChange={setOtpCode}
      numInputs={6}
      renderInput={(props) => <input {...props} />}
    />
           </div>
           <div style={{marginTop:"20px"}} className={styles['text-field']}>
           <TextFieldIcon
             inputName="password"
             imgSrc="../../icons/lock-icon.svg"
             imgAlt="phone icon"
             label='ثبت رمز ورود'
             type={!showPass && "password"}
             value={password}
             autoComplete="new-password"
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
             handleOnChange={(e:any) => setPassword(e.target.value)}
             endIcon
             />
            </div>
           </div>
           <div style={{marginTop:"20px"}} className={styles.btn}>
               <button onClick={otpHandler}>
                تایید شماره موبایل
               </button>
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
 
export default Otp;