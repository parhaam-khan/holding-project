import Image from 'next/image';
import styles from './layout.module.scss'
import cs from 'classnames'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';

const Footer = () => {
    const router = useRouter();
    const{isLogin} = useAuth();
const[active,setActive] = useState('homeActive');
const[merchantId,setMerchantId] = useState('');

useEffect(() => {
    const data = JSON.parse(localStorage.getItem('holdingInfo')  || '{}') 
    setMerchantId(data.id)
},[])

useEffect(() => {
    handleChangeMenu()
},[router.pathname])

const handleChangeMenu = () => {
if(router.pathname === '/[merchantId]'){
    setActive('homeActive')
}else if(router.pathname === '/history'){
    setActive('historyActive')
}else if(router.pathname === '/profile'){
    setActive('profileActive')
}
}


    return ( 
        <div className={styles.footer}>
           <div className={styles.menuItem}>
            <div className={cs(styles['extra-border'],active === 'homeActive' && styles[`${active}`])}></div>
            <Link href={`/${merchantId}`}>
            <button className={styles['footer-btn']}>
            <Image
                src="icons/home-icon.svg"
                alt="home icon"
                width={24}
                height={24}
              />
              <p>خانه</p>
            </button>
           </Link>
           </div>
           <div className={styles.menuItem}>
           <Link href="/history">
           <div className={cs(styles['extra-border'],active === 'historyActive' && styles[`${active}`])}></div>
           <button className={styles['footer-btn']}>
           <Image
                src="icons/history-purchasing-icon.svg"
                alt="history icon"
                width={24}
                height={24}
              />
              <p>سوابق خرید</p>
           </button>
           </Link>
           </div>
           <div className={styles.menuItem}>
           <Link href={isLogin() ? "/profile" : "/authenticate/login"}>
           <div className={cs(styles['extra-border'],active === 'profileActive' && styles[`${active}`])}></div>
           <button className={styles['footer-btn']}>
           <Image
                src="icons/profile-icon.svg"
                alt="notif icon"
                width={24}
                height={24}
              />
              <p>پروفایل</p>
           </button>
           </Link>
           </div>
        </div>
     );
}
 
export default Footer;