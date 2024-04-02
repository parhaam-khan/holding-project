import { useEffect, useState } from 'react';
import styles from './authLayout.module.scss'
import Image from 'next/image';
import Head from 'next/head';
import { LayoutProps } from '@/types';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '@/helper';
import { fetchHoldingInfo } from '@/features/holding/holdingSlice';


//LAYOUT for auth pages (login/register/otp)

const AuthLayout = ({ children } : LayoutProps) => {
    const holdingInfo = useSelector((state:any) => state.holding.holdingInfo);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
     const{isLogin} = useAuth();
     const merchantId = router.query.merchantId 
     const dispatch = useDispatch<any>();

    useEffect(() => {
        if(isLogin()) router.replace(`/profile`) 
        setIsClient(true)
    },[])

    useEffect(() => {
      if(isEmpty(holdingInfo) && merchantId){
        dispatch(fetchHoldingInfo(merchantId))
      }
      },[merchantId])

    return ( 
        <>
        <Head>
        <title>{holdingInfo.name}</title>
        <link rel='icon' href={holdingInfo.logo} />
      </Head>
        {isClient &&
         <div className={styles['auth-layout']}>
        <div className={styles['holding-name']}>
        <Image
                className={styles.img}
                src={holdingInfo?.logo}
                alt={holdingInfo?.name || 'holding name'}
                width={64}
                height={64}
                priority
              />
         <p className={styles.name}>
          {holdingInfo?.name}
         </p>
        </div>
        <div className={styles['login-register-fields']}>
         {children}
        </div>
        </div>}
        </>
     );
}
 
export default AuthLayout;