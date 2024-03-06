import Layout from '@/components/layout';
import useAuth from '@/hooks/useAuth';
import { API } from '@/services/request-http';
import styles from '@/styles/creditcard.module.scss'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import backIcon from '../../../../public/icons/back-icon.svg'
import FilterBtn from '@/components/buttons/FilterBtn';
import CreditcardDetail from '@/components/cards/CreditcardDetail';
import { isEmpty } from '@/helper';
import { useSelector } from 'react-redux';
import LoadingCircle from '@/components/loading/loading-circle';
import Link from 'next/link';

const CreditCard = () => {
    const{validateToken} = useAuth();
    const router = useRouter();
    const[loading,setLoading] = useState(true);
    // const[holdingInfo,setHoldingInfo] = useState<{[key:string]:any}>({});
    const holdingInfo = useSelector((state:any) => state.holding.holdingInfo);
    const merchantId = useSelector((state:any) => state.holding.holdingInfo.id);

    const[creditcardInfo,setCreditcardInfo] = useState<{[key:string]:any}>({});
    // console.log(creditcardInfo);

    useEffect(() => {
      if(merchantId){
        initialApi(merchantId);
      }
    }, [merchantId]);

        const initialApi = async(merchantId:any) => {
            let headers = {
                'SM-TOKEN': localStorage.getItem('token') && JSON.parse(localStorage.getItem('token') || ''),
                'X-VIEWNAME': 'simple',
              };
            try{
                const res = await API(`creditCard/${merchantId}/sellableCreditCards`,'get',{},headers)
                const{data:{resultList}} = res;
                setCreditcardInfo(resultList);
                setLoading(false)
            }catch(err:any){
                // console.log(err);
                err.response && validateToken(err.response.status);
                err.response && console.log(err.response.data.message);
                setLoading(false)
            }
          }

    return ( 
      <Layout loginCheck footer={false}>
        {loading ? <LoadingCircle/> : ''}
 <div className={styles.creditcard}>
   <div className={styles['main-title']}>
   <Link href={`/${merchantId}/profile`} className={styles.back}>
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
    کارت اعتباری
   </p>
   </div>
   <div className={styles['filters-btn']}>
        <FilterBtn clickHandle={() => router.push(`/${holdingInfo.id}/profile/my-creditcard`)} imgSource={'../../icons/credit-card-filter-icon.svg'}>
       <p>نمایش کارت های من</p> 
       </FilterBtn>
       </div>
       <div className={styles.cards}>
        {!isEmpty(creditcardInfo) && creditcardInfo.map((item:any) => (
          <CreditcardDetail holdingInfo={holdingInfo} data={item} key={item.id}/>
        ))}
       </div>
    </div>
        </Layout>
       
     );
}
 
export default CreditCard;