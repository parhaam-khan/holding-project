import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import SearchTextfield from '@/components/textFields/SearchTextfield'
import FilterBtn from '@/components/buttons/FilterBtn'
import BranchInfoCard from '@/components/cards/BranchInfoCard'
import { useEffect, useState } from 'react'
import FilterList from '@/components/filterListDialog/FilterList'
import { API } from '@/services/request-http'
import { isEmpty } from '@/helper'
import cs from 'classnames'
import Layout from '@/components/layout'
import { wrapper } from '@/store'
import { fetchHoldingInfo } from '@/features/holding/holdingSlice'
import { useSelector, useStore } from 'react-redux'

export default function Home(props:any) {
   console.log('State on render', useSelector((state:any) => state.holding));
     const{initialState:{holding}} = props;
   
    //  console.log(props);
    const[holdingInfo,setHoldingInfo] = useState(holding?.holdingInfo ?? {});
    const[subMerchants,setSubMerchants] = useState(holding?.holdingInfo?.subMerchantTagVOS ?? []);
 const[showFilterList,setShowFilterList] = useState({
    show:false,
    type:''
 });
//  console.log(showFilterList);
// console.log(props);

// useEffect(() => {
//   if(holding.holdingInfo){
//     localStorage.setItem('holdingInfo', JSON.stringify(holdingInfo));
//   }
// },[props])

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
      {!isEmpty(holding.holdingInfo)  ?
      <Layout>
      <main className={styles.main}>
       <SearchTextfield
       holdingInfo={holdingInfo}
        setSubMerchants={setSubMerchants}
         />
       {(!isEmpty(holdingInfo.tagList) || !isEmpty(holdingInfo.cityList)) &&
       <div className={styles['filters-btn']}>
       {!isEmpty(holdingInfo.tagList) &&
        <FilterBtn clickHandle={() => showFilterListHandler('cat')} imgSource={'icons/category-icon.svg'}>
       <p>دسته بندی شعب</p> 
       </FilterBtn>}
       {!isEmpty(holdingInfo.cityList) &&
       <FilterBtn clickHandle={() => showFilterListHandler('city')} imgSource={'icons/location-icon.svg'}>
      <p>همه شهرها</p>
       </FilterBtn>}
       </div>}
       {!isEmpty(subMerchants) &&
        subMerchants?.map((item:any,idx:number) => (
          <div className={styles['branch-section']} key={idx + 1}>
             <div className={styles['header-horizental']}>
               <span className={styles['category-name']}>{item.tag}</span>
            {!isEmpty(item.subMerchantList) && item.subMerchantList.length > 1 &&
          <span className={styles['show-all-text']}>مشاهده همه</span>
            }
            </div>
          <div className={cs(styles.branches,item.subMerchantList.length > 1 && styles.horizental)}>
            {item.subMerchantList.map((branch:any,index:number) => (
                <BranchInfoCard tagList={item.subMerchantList} key={branch.id} branchInfo={branch}/>
            ))}
             </div>
             </div>
        )
        )}
       
      </main>
      </Layout> 
      :
      <div className={styles['holding-not-exist']}>
        <p>
        {holding.errorMsg}
        </p>
      </div>
      }
      {showFilterList.show && 
      <FilterList
       listItem={showFilterList.type === 'cat' ? holdingInfo.tagList : holdingInfo.cityList}
       mainInfo={holdingInfo}
       type={showFilterList.type}
       setShowFilterList={setShowFilterList}
       showFilterList={showFilterList}
       setData={setSubMerchants}
        />}
    </>
  )
}
// export const getServerSideProps = (async(context: any) => {
// try{
// const res:any = await API(`${context.query.merchantId}/holding`, "get")
//   return { props: {merchantInfo:res.data,contextQuery:context.query}}
// } catch (error: any) {
//   return { props: {merchantInfo: null,msg:error.response.data.message || ''}}
// }
// })
export const getServerSideProps = wrapper.getServerSideProps(store => async (context: any) => {
  const id = context.query.merchantId;
  if (!id) {
      console.log('Param id not found');
  }
  await store.dispatch(fetchHoldingInfo(id));

  return {
      props: {
      contextQuery:context.query
      },
  };
});