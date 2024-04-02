import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import styles from '@/styles/history.module.scss'
import Image from "next/image";
import PurchaseHistoryCard from "@/components/cards/PurchaseHistoryCard";
import { isEmpty, thousandSeperator } from "@/helper";
import FilterBtn from "@/components/buttons/FilterBtn";
import { API } from "@/services/request-http";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import FilterList from "@/components/filterListDialog/FilterList";
import LoadingCircle from "@/components/loading/loading-circle";
import { useSelector } from "react-redux";
import Head from "next/head";
import { useSnackbar } from "notistack";

const History = () => {
const{validateToken} = useAuth();
const { enqueueSnackbar } = useSnackbar();
const merchantId = useSelector((state:any) => state.holding.holdingInfo.id);
const[historyInfo,setHistoryInfo] = useState<{[key:string]:any}>({});
const holdingInfo = useSelector((state:any) => state.holding.holdingInfo);
// const[holdingInfo,setHoldingInfo] = useState<{[key:string]:any}>({});
// console.log(historyInfo);
const[purchaseInfo,setPurchaseInfo] = useState([]);
const[loading,setLoading] = useState(true);
const[showFilterList,setShowFilterList] = useState({
   show:false,
   type:''
});

useEffect(() => {
  if(merchantId){
    console.log('id accessss');
    initialApi(merchantId)
  }
   },[merchantId])


  const initialApi = async(merchantId:any) => {
   let headers = {
       'SM-TOKEN': localStorage.getItem('token') && JSON.parse(localStorage.getItem('token') || ''),
       'X-VIEWNAME': 'simple',
     };
   try{
       const res = await API(`preauth/bills/customer/${merchantId}/getCustomerBill?sort=createdDate,desc`,'get',{},headers)
       const{data} = res;
       setHistoryInfo(data);
       setPurchaseInfo(data.billViews)
       setLoading(false)
   }catch(err:any){
       err.response && validateToken(err.response.status)
       err.response && enqueueSnackbar(err.response.data.message, { variant: 'error'});
       setLoading(false)
   }
 }

 const showFilterListHandler = (type:string) => {
   setShowFilterList({...showFilterList,show:true,type})
 }

    return ( 
      <>
        <Head>
        <title>{holdingInfo?.name}</title>
        <meta name="description" content={holdingInfo?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={holdingInfo.logo} />
      </Head>
        <Layout loginCheck>
        {loading ? <LoadingCircle/> : ''}
        {!isEmpty(historyInfo.billViews) &&
         <div className={styles.history}>
            <div className={styles['main-title']}>
         سوابق خرید از تمام شعب
            </div>
            <div className={styles['main-info']}>
               <div className={styles['main-info-item']}>
                  <div className={styles.img}>
                  <Image
                src={'../icons/wallet-icon.svg'}
                alt='icon'
                width={40}
                height={40}
                priority
                />
                  </div>
                  <div className={styles.title}>
                 <p>
                  کل خرید شما
                 </p>
                  </div>
                <div className={styles.amount}>
                  <span className={styles.value}>
                  {thousandSeperator(historyInfo.sumAmount)}
                  </span>
                  <span className={styles.currency}>
                  تومان
                  </span>
                </div>
               </div>
               <div className={styles['main-info-item']}>
                  <div className={styles.img}>
                  <Image
                src={'../icons/discount-icon.svg'}
                alt='icon'
                width={40}
                height={40}
                priority
                />
                  </div>
                  <div className={styles.title}>
                 <p>
                  مجموع تخفیف ها
                 </p>
                  </div>
                <div className={styles.amount}>
                  <span className={styles.value}>
                  {thousandSeperator(historyInfo.sumDiscount)}
                  </span>
                  <span className={styles.currency}>
                  تومان
                  </span>
                </div>
               </div>
            </div>
            {/* {(!isEmpty(holdingInfo.tagList)) &&
       <div className={styles['filters-btn']}>
       {!isEmpty(holdingInfo?.tagList) &&
        <FilterBtn clickHandle={() => showFilterListHandler('cat')} imgSource={'icons/category-icon.svg'}>
       <p>دسته بندی</p> 
       </FilterBtn>}
       </div>} */}
            {!isEmpty(purchaseInfo) && purchaseInfo.map((item:any,idx:number) => (
 <div key={item.id} className={styles.purchases}>
 <PurchaseHistoryCard item={item}/>
 </div>
            ))
            }
        </div>}
      {!loading && isEmpty(historyInfo.billViews) &&
        <div className={styles.empty}>
           <div className={styles['main-title']}>
         سوابق خرید از تمام شعب
            </div>
            <div className={styles['empty-icon']}>
            <Image
                src={'icons/empty-history-icon.svg'}
                alt='icon'
                width={128}
                height={128}
                />
        <p>
         شما تا کنون از مجموعه ما خرید نداشته اید
        </p>
            </div>
      
        </div>
        }
        </Layout>
          {/* {showFilterList.show &&  
          <FilterList
          listItem={showFilterList.type === 'cat' ? holdingInfo?.tagList : holdingInfo.cityList}
          mainInfo={historyInfo}
          type={showFilterList.type}
          setShowFilterList={setShowFilterList}
          showFilterList={showFilterList}
         setData={setPurchaseInfo}
           />} */}
           </>
     );
}
 
export default History;