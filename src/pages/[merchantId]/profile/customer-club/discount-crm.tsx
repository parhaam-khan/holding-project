import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import styles from '@/styles/discountCrm.module.scss';
import Image from "next/image";
import backIcon from '../../../../../public/icons/back-icon.svg';
import coinIcon from '../../../../../public/icons/coin-icon.svg';
import { copyToClipboardHandler } from "@/helper";
import { useSelector } from "react-redux";
import Link from "next/link";

const DiscountCrm = () => {
  const merchantId = useSelector((state:any) => state.holding.holdingInfo.id);

  useEffect(() => {
    if(merchantId){
      // initialApi(merchantId);
    }
  }, [merchantId]);


    return ( 
        <div>
           <Layout loginCheck footer={false}>
  <div className={styles['discount-crm']}>
  <div className={styles['main-title']}>
    
   <Link href={`/${merchantId}/profile/customer-club`} className={styles.back}>
   <Image
                src={backIcon}
                alt="back icon"
                width={24}
                height={24}
              />
              <p>
                بازگشت
              </p>
   </Link>
   <p className={styles.title}>
    تخفیف های دریافتی
   </p>
   </div>
   <div className={styles['discount-crm-cards']}>
   <div className={styles.card}>
    <div className={styles['img-and-name']}>
    <Image
                src={coinIcon}
                alt="card img"
                width={48}
                height={48}
              />
              <div className={styles['main-title-card']}>
               <p className={styles['card-title']}>
                استخر بورسا 50 هزار تومان تخفیف
               </p>
              <div className={styles['desc']}>
              <p>
                مهلت استفاده: تا 24 روز دیگر برای 1 بار   
              </p>
              </div>
              </div>
    </div>
 <div className={styles.btns}>
<button className={styles['code-btn']}>
              <p>
           fcyhjcfhkygodsz12   
              </p>
</button>
<button className={styles['copy-code-btn']} onClick={() => copyToClipboardHandler('fcyhjcfhkygodsz12')}>
    کپی کردن کد
</button>
 </div>
   </div>
   </div>
  </div>
           </Layout>
        </div>
     );
}
 
export default DiscountCrm;