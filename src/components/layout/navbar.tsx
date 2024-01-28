import Image from 'next/image';
import styles from './layout.module.scss';
import { useEffect, useState } from 'react';

const Navbar = (props:any) => {
    const{holdingInfo} = props;
    // const[holdingInfo,setHoldingInfo] = useState<{[key: string]: any}>({});


    // useEffect(() => {
    //     const data = JSON.parse(localStorage.getItem('holdingInfo')  || '{}') 
    //     setHoldingInfo(data)
    // },[])

    return ( 
        <div className={styles.navbar}>
            <div className={styles['holding-name-logo-notifs']}>
                <div className={styles['holding-name-logo']}>
                <div className={styles['merchant-logo']}>
                <Image
                className={styles.img}
                src={holdingInfo?.logo}
                alt={holdingInfo?.name || 'holding name'}
                width={40}
                height={40}
                priority
              />
                </div>
                <h1 className={styles['merchant-name']}>
                    {holdingInfo?.name}
                </h1>
                </div>
         <div className={styles.notifs}>
         <Image
                src="icons/notif-icon.svg"
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