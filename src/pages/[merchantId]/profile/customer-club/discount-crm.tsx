import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import styles from '@/styles/discountCrm.module.scss';
import Image from "next/image";
import backIcon from '../../../../../public/icons/back-icon.svg';
import coinIcon from '../../../../../public/icons/coin-icon.svg';
import { useSelector } from "react-redux";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { isEmpty } from "@/helper";
import moment from "jalali-moment";

const DiscountCrm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const merchantId = useSelector((state:any) => state.holding.holdingInfo.id);
  const useableDiscountList = useSelector((state:any) => state.user.userInfo.usableDiscounts);
console.log(useableDiscountList);

const copyToClipboardHandler = (text:any) => {
  navigator.clipboard.writeText(text).then(() => {
    enqueueSnackbar('کد تخفیف با موفقیت کپی شد', { variant: 'success'})
    },() => {
      enqueueSnackbar('خطا کپی کردن متن موردنظر', { variant: 'error'})
    });
}

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
   {!isEmpty(useableDiscountList) && useableDiscountList.map((item:any) => ( 
   <div key={item.id} className={styles['discount-crm-cards']}>
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
                {item.title}
               </p>
              <div className={styles['desc']}>
              <p>
                مهلت استفاده: تا 
                <span className={styles['date-detail']}>
                    {moment(item.endDate).format('jDD')}
                    </span>
                    <span className={styles['date-detail']}>
                      {moment(item.endDate).locale('fa').format('jMMMM')}
                    </span>
                    <span className={styles['date-detail']}>
                      {moment(item.endDate).format('jYYYY')}
                    </span>
                    <span className={styles['limitation-text']}>
                    برای 
                    {" "}{item.limitation}{" "}
                    بار
                    </span>   
              </p>
              </div>
              </div>
    </div>
 <div className={styles.btns}>
<button className={styles['code-btn']}>
              <p>
              {item.clubCode}   
              </p>
</button>
<button className={styles['copy-code-btn']} onClick={() => copyToClipboardHandler('fcyhjcfhkygodsz12')}>
    کپی کردن کد
</button>
 </div>
   </div>
   </div>
   ))}

  </div>
           </Layout>
        </div>
     );
}
 
export default DiscountCrm;