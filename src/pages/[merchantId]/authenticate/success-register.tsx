import AuthLayout from '@/components/AuthLayout';
import styles from '@/styles/auth.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const SuccessRegister = () => {
    const merchantId = useSelector((state:any) => state.holding.holdingInfo.id);

    // const[merchantId,setMerchantId] = useState('');

    // useEffect(() => {
    //     const data = JSON.parse(localStorage.getItem('holdingInfo')  || '{}') 
    //         setMerchantId(data.id)
    // },[])


    return ( 
        <AuthLayout>
        <div className={styles.login}>
           <div style={{marginTop:"20px"}}>
           <Image
                src={ '../../icons/success-icon.svg'}
                alt='hide pass icon'
                width={80}
                height={80}
                priority
                />
           </div>
          <div className={styles['success-register-text']}>
            <p>
                ثبت نام با موفقیت انجام شد
            </p>
          </div>
            <div className={styles['register-success-btn']}>
            <Link href={`/${merchantId}`}>
             ورود به سایت شعب
            </Link>
            </div>
        </div>
        </AuthLayout>
     );
}
 
export default SuccessRegister;