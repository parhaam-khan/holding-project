import { API } from "@/services/request-http";
import { useEffect, useState } from "react";
import styles from '@/styles/creditcard.module.scss'
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import Layout from "@/components/layout";
import Image from "next/image";
import backIcon from '/public/icons/back-icon.svg';
import backDarkIcon from "/public/icons/back-dark-icon.svg";
import { isEmpty, separateToCardNumber, thousandSeperator } from "@/helper";
import { useSelector } from "react-redux";
import LoadingCircle from "@/components/loading/loading-circle";
import Link from "next/link";
import { useSnackbar } from "notistack";
import useTheme from "@/hooks/useTheme";

const MyCreditcard = () => {
  const{theme} = useTheme();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const[loading,setLoading] = useState(true);
    const merchantId = useSelector((state:any) => state.holding.holdingInfo.id);
    const holdingName = useSelector((state:any) => state.holding.holdingInfo.name);

    const[creditcardInfo,setCreditcardInfo] = useState([]);
// console.log(creditcardInfo);
useEffect(() => {
  if(merchantId){
    initialApi(merchantId);
  }
}, [merchantId]);

        const initialApi = async(merchantId:any) => {
            let headers = {
                'SM-TOKEN': localStorage.getItem('token') && JSON.parse(localStorage.getItem('token') || ''),
              };
            try{
                const res = await API(`preauth/creditCard/${merchantId}/myCards`,'get',{},headers)
                const{data:{resultList}} = res;
                // console.log(resultList);
                 setCreditcardInfo(resultList)
                 setLoading(false)
            }catch(err:any){
                err.response && enqueueSnackbar(err.response.data.message, { variant: 'error',hideIconVariant:true});
                setLoading(false)
            }
          }

    return ( 
        <Layout loginCheck footer={false}>
           {loading ? <LoadingCircle/> : ''}
        <div className={styles['my-credit-card']}>
            <div className={styles['main-title']}>
    <Link href={`/${merchantId}/profile/creditcard`} className={styles.back}>
    {theme === 'dark'?
            <Image src={backDarkIcon} alt="back icon" width={24} height={24} />
            :
            <Image src={backIcon} alt="back icon" width={24} height={24} />
             }
              <p>
                بازگشت
              </p>
   </Link>
    <p className={styles.title}>
       کارت اعتباری من
    </p>
    </div>
    <div className={styles['content']}>
     {!isEmpty(creditcardInfo) && creditcardInfo?.map((item:any,idx:number) => (
     <div className={styles['credit-card-img']} key={idx}>
     <Image
             className={styles['img']}
              src={"../../icons/my-credit-card-bg.svg"}
             alt='credit card'
             fill={true}
             priority
           />
           <div className={styles['credit-card-title']}>
          <div className={styles.icon}>
          <Image
              src={"../../icons/credit-card-white-icon.svg"}
             alt='credit card'
             width={24}
             height={24}
             priority
           />
           <p>
             کارت اعتباری
           </p>
          </div>
          <p className={styles['holding-name']}>
            {holdingName}
          </p>
           </div>
           <div className={styles['value-section']}>
             <div className={styles['credit-card-number']}>
                 <span>
                     {separateToCardNumber(item.cardNumber)}
                 </span>
             </div>
         <p className={styles['credit-txt']}>
         اعتبار:
         </p>
         <div className={styles.amount}>
         <span>
             {thousandSeperator(item.startingAmount)}
         </span>
         <p className={styles.currency}>
         تومان
         </p>
         </div>
           </div>
     </div>
 ))}
    
    </div>
        </div>
        </Layout>
     );
}
 
export default MyCreditcard;