import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from '@/styles/creditcard.module.scss';
import Image from "next/image";
import { isEmpty, separateToCardNumber, thousandSeperator } from "@/helper";
import Layout from "@/components/layout";
import { API } from "@/services/request-http";
import useAuth from "@/hooks/useAuth";
import cs from 'classnames';
import { useSnackbar } from "notistack";
import LoadingCircle from "@/components/loading/loading-circle";

const CreditCardReceipt = () => {
    const router = useRouter();
    const{r,merchantId} = router.query;
    const { enqueueSnackbar } = useSnackbar();
    const{validateToken} = useAuth();
    const[creditCardInfo,setCreditCardInfo] = useState<{[key:string] : any}>({});
    const[isApiError,setIsApiError] = useState(false);
    const[isLoading,setIsLoading] = useState(true);
    // console.log(router.query);

    useEffect(() => {
        if(r){
           initialApi(r);
        }
      }, [r]);
        
          const initialApi = async(id:any) => {
            try{
                const res = await API(`creditCard/${id}/paymentInfo`,'get')
                const{data:{result}} = res;
                //  console.log(res);
                setCreditCardInfo(result)
                setIsLoading(false)
            }catch(err:any){
                console.log(err);
                setIsLoading(false)
                setIsApiError(true)
                // err.response && validateToken(err.response.status);
                err.response &&  enqueueSnackbar(err.response.data.message, { variant: 'error'})
            }
          }
          
    return ( 
        <Layout footer={false}>
            {isLoading ? <LoadingCircle/> : ''}
        {!isEmpty(creditCardInfo) && 
        <div className={styles['credit-card-receipt']}>
    <p className={styles['main-title']}>
       کارت اعتباری من
    </p>
    <div className={cs(styles['content'])}>
    <div className={styles['icon']}>
    <Image
                 src={"../icons/success-receipt-icon.svg"}
                alt='success-icon'
                width={100}
                height={100}
                priority
              />
    </div>
    <div className={styles['success-text']}>
     <p>
        کارت اعتباری شما با موفقیت صادر شد
     </p>
    </div>
    <div className={styles['credit-card-img']}>
        <Image
                className={styles['img']}
                 src={"../icons/my-credit-card-bg.svg"}
                alt='credit card'
                fill={true}
                priority
              />
              <div className={styles['credit-card-title']}>
             <div className={styles.icon}>
             <Image
                 src={"../icons/credit-card-white-icon.svg"}
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
               {creditCardInfo.merchantName}
             </p>
              </div>
              <div className={styles['value-section']}>
                <div className={styles['credit-card-number']}>
                    <span>
                        {separateToCardNumber(creditCardInfo.cardNumber)}
                    </span>
                </div>
            <p className={styles['credit-txt']}>
            اعتبار:
            </p>
            <div className={styles.amount}>
            <span>
                {thousandSeperator(creditCardInfo.amount)}
            </span>
            <p className={styles.currency}>
            تومان
            </p>
            </div>
              </div>
        </div>
        <div className={styles['extra-info']}>
         {/* <div className={styles.item}>
            <p>
                شماره تراکنش:
            </p>
            <span>
                3516516
            </span>
         </div> */}
         <div className={styles.item}>
            <p>
                مبلغ پرداخت شده:
            </p>
            <div className={styles.amount}>
            <span>
            {thousandSeperator(creditCardInfo.amount)}
            </span>
            <span className={styles.currency}>
            تومان
            </span>
            </div>
         </div>
        </div>
        <div className={styles.backBtn}>
            <button onClick={() => router.push(`/${merchantId}`)}>
                بازگشت به صفحه اصلی
            </button>
        </div>
    </div>
        </div>  
        }
        {isEmpty(creditCardInfo) && !isApiError && !isLoading
          && (
       <div className={styles['credit-card-receipt']}>
       <p className={styles['main-title']}>
          کارت اعتباری من
       </p>
       <div className={cs(styles['content'],styles.fail)}>
       <div className={styles['icon']}>
       <Image
                    src={"../icons/fail-receipt-icon.svg"}
                   alt='fail-icon'
                   width={100}
                   height={100}
                   priority
                 />
       </div>
       <div className={styles['error-text']}>
        <p>
            پرداخت شما ناموفق بود.
        </p>
       </div>
       <div className={styles['fail-desc']}>
       <p>
        در صورت کسر مبلغ از حساب شما، تا 72 ساعت آینده مبلغ پرداختی از طریق بانک بازگشت خواهد شد.
       </p>
       </div>
           <div style={{marginTop:"15px"}} className={styles.backBtn}>
               <button onClick={() => router.push(`/${merchantId}`)}>
                   بازگشت به صفحه اصلی
               </button>
           </div>
       </div>
           </div>  
        )

        }
        </Layout>
     );
}
 
export default CreditCardReceipt;