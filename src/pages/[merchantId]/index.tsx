import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'
import SearchTextfield from '@/components/textFields/SearchTextfield'
import FilterBtn from '@/components/buttons/FilterBtn'
import BranchInfoCard from '@/components/cards/BranchInfoCard'
import { useEffect, useState } from 'react'
import FilterList from '@/components/filterListDialog/FilterList'
import { API } from '@/services/request-http'
import { isEmpty } from '@/helper'

export default function Home(props:any) {
    const{data} = props;
    const holdingInfo = data.result
 const[showFilterList,setShowFilterList] = useState(false);
console.log(props);

useEffect(() => {
    localStorage.setItem('holdingInfo', JSON.stringify(holdingInfo));
},[props])

  const showFilterListHandler = () => {
    setShowFilterList(true)
  }
  return (
    <>
      <Head>
        <title>{holdingInfo.name}</title>
        <meta name="description" content={holdingInfo.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={holdingInfo.logo} />
      </Head>
      <main className={styles.main}>
       <SearchTextfield/>
       {!isEmpty(holdingInfo.tagList) || !isEmpty(holdingInfo.cityList) &&
       <div className={styles['filters-btn']}>
       {!isEmpty(holdingInfo.cityList) &&
        <FilterBtn clickHandle={showFilterListHandler} imgSource={'icons/category-icon.svg'}>
       <p>دسته بندی</p> 
       </FilterBtn>}
       {!isEmpty(holdingInfo.tagList) &&
       <FilterBtn clickHandle={showFilterListHandler} imgSource={'icons/location-icon.svg'}>
      <p>همه شهرها</p>
       </FilterBtn>}
       </div>}
       <div className='branches'>
      <BranchInfoCard/>
      <BranchInfoCard/>
      <BranchInfoCard/>
       </div>
      </main>
      {showFilterList && <FilterList setShowFilterList={setShowFilterList}/>}
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
