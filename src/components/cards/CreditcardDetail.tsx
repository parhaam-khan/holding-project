import Image from 'next/image';
import styles from './cards.module.scss'
import { thousandSeperator } from '@/helper';
import { API } from '@/services/request-http';
import { useSelector } from 'react-redux';

const CreditcardDetail = (props:any) => {
    const{data,holdingInfo} = props;
    const userInfo = useSelector((state:any) => state.user.userInfo);

    const submitPurchaseCardHandler = async() => {
        let dataObj = {
            creditCardId:  data.id ,
            msisdn:  0 + ( userInfo?.msisdn.slice(2)),
            callBackUrl: `https://${window.location.host}/h/${holdingInfo.id}/creditCard-receipt`
          }
        try{
            const res = await API(`creditCard/${holdingInfo.id}/sellableCreditCards?page=0&pageSize=250&sort=id,desc`,'post',JSON.stringify(dataObj))
            const{data:{result}} = res;
            window.location.href= result?.link
        }catch(err:any){
            console.log(err);
            err.response && console.log(err.response.data.message);
        }
    }

    return ( 
        <div className={styles['credit-card-detail']}>
        <div className={styles['credit-card-img']}>
        <Image
                className={styles['img']}
                 src={"../../icons/credit-card-bg.svg"}
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
               {holdingInfo.name}
             </p>
              </div>
              <div className={styles['value-section']}>
            <p className={styles['credit-txt']}>
            اعتبار:
            </p>
            <div className={styles.amount}>
            <span>
                {thousandSeperator(data?.amount)}
            </span>
            <p className={styles.currency}>
            تومان
            </p>
            </div>
              </div>
        </div>
        <div className={styles.payment}>
        <div className={styles['payment-value']}>
          <p className={styles['amount-txt']}>
            مبلغ:
          </p>
          <div className={styles.amount}>
         <span>
            {thousandSeperator(data?.sellPrice)}
         </span>
         <p className={styles.currency}>
            تومان
         </p>
          </div>
        </div>
        <button onClick={submitPurchaseCardHandler}>
            خرید کارت
        </button>
        </div>
        </div>
     );
}
 
export default CreditcardDetail;