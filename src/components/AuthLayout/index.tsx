import { useEffect, useState } from 'react';
import styles from './authLayout.module.scss'
import Image from 'next/image';
import Head from 'next/head';
import { LayoutProps } from '@/types';


const AuthLayout = ({ children } : LayoutProps) => {
    const[holdingInfo,setHoldingInfo] = useState<{[key: string]: any}>({});

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('holdingInfo')  || '{}') 
        setHoldingInfo(data)
    },[])

    return ( 
        <>
        <Head>
        <title>{holdingInfo.name}</title>
        <link rel='icon' href={holdingInfo.logo} />
      </Head>
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
        </div>
        </>
     );
}
 
export default AuthLayout;