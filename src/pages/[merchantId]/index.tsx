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

export default function Home(props:any) {
    const{data} = props;
    const[holdingInfo,setHoldingInfo] = useState(data.result ?? {});
    const[subMerchants,setSubMerchants] = useState(data.result.subMerchantTagVOS ?? []);
 const[showFilterList,setShowFilterList] = useState({
    show:false,
    type:''
 });
//  console.log(showFilterList);
// console.log(props);
 console.log(holdingInfo);

useEffect(() => {
    localStorage.setItem('holdingInfo', JSON.stringify(holdingInfo));
},[props])

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
       <p>دسته بندی</p> 
       </FilterBtn>}
       {!isEmpty(holdingInfo.cityList) &&
       <FilterBtn clickHandle={() => showFilterListHandler('city')} imgSource={'icons/location-icon.svg'}>
      <p>همه شهرها</p>
       </FilterBtn>}
       </div>}
       {!isEmpty(subMerchants) &&
      <div className={cs(styles.branches,holdingInfo.tagList.length > 1 && styles.horizental)}>
        {subMerchants?.map((item:any) => (
            item.subMerchantList.map((branch:any,index:number) => (
                <>
                <BranchInfoCard tagList={holdingInfo.tagList} key={index} branchInfo={branch}/>
                {/* <BranchInfoCard tagList={holdingInfo.tagList} key={index + 1} branchInfo={item}/>
                <BranchInfoCard tagList={holdingInfo.tagList} key={index + 2} branchInfo={item}/>
                <BranchInfoCard tagList={holdingInfo.tagList} key={index + 3} branchInfo={item}/>
                <BranchInfoCard tagList={holdingInfo.tagList} key={index + 3} branchInfo={item}/>
                <BranchInfoCard tagList={holdingInfo.tagList} key={index + 3} branchInfo={item}/> */}
                </>
            ))
          
        ))}
       </div>}
      </main>
      </Layout>
      {showFilterList.show && 
      <FilterList
       listItem={showFilterList.type === 'cat' ? holdingInfo.tagList : holdingInfo.cityList}
       holdingInfo={holdingInfo}
       setShowFilterList={setShowFilterList}
       showFilterList={showFilterList}
       subMerchants={subMerchants}
       setSubMerchants={setSubMerchants}
        />}
    </>
  )
}
export const getServerSideProps = (async(context: any) => {
try{
const res:any = await API(`${context.query.merchantId}/holding`, "get")
  return { props: {data:res.data,contextQuery:context.query}}
} catch (error: any) {
  return { props: {merchantInfo: {}}}
}
})
