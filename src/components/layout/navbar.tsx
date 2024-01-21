import Image from 'next/image';
import styles from './layout.module.scss';

const Navbar = () => {
    return ( 
        <div className={styles.navbar}>
            <div className={styles['holding-name-logo-notifs']}>
                <div className={styles['holding-name-logo']}>
                <div className={styles['merchant-logo']}>
                <Image
                className={styles.img}
                src="vercel.svg"
                alt="merchant Logo"
                width={40}
                height={40}
                priority
              />
                </div>
                <h1 className={styles['merchant-name']}>
                    رستوران ترکیه بورسا
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