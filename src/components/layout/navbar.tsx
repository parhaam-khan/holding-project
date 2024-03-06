import Image from 'next/image';
import styles from './layout.module.scss';
import notifIcon from '../../../public/icons/notif-icon.svg'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const Navbar = () => {
    const holdingInfo = useSelector((state:any) => state.holding.holdingInfo);
    const router = useRouter()
    // const[holdingInfo,setHoldingInfo] = useState<{[key: string]: any}>({});


    // useEffect(() => {
    //     const data = JSON.parse(localStorage.getItem('holdingInfo')  || '{}') 
    //     setHoldingInfo(data)
    // },[])

    return ( 
        <div className={styles.navbar}>
            <div className={styles['holding-name-logo-notifs']}>
                <div className={styles['holding-name-logo']}>
                <Link href={`/${holdingInfo.id}`} className={styles['merchant-logo']}>
                <Image
                className={styles.img}
                src={holdingInfo?.logo}
                alt={holdingInfo?.name || 'holding name'}
                width={40}
                height={40}
                priority
              />
                </Link>
                <h1 className={styles['merchant-name']}>
                    {holdingInfo?.name}
                </h1>
                </div>
                <div className={styles.divider}></div>
         <div className={styles.notifs} onClick={() => router.push(`/${holdingInfo.id}/notifications`)}>
         <Image
                src={notifIcon}
                alt="notif icon"
                width={26}
                height={26}
              />
         </div>
            </div>
          
        </div>
     );
}
 
export default Navbar;