import Navbar from './navbar'
import Footer from './footer'
import styles from './layout.module.scss'
import { LayoutProps } from '@/types'
import { useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '@/helper'
import { fetchHoldingInfo } from '@/features/holding/holdingSlice'



export default function Layout({ 
  children, //what is in Layout tag
  footer=true, // show and hide footer
  loginCheck = false, //if page needs token for getting data from API you should pass 'loginCheck' props to layout
  apiCode // api code like 403,500,404,etc. (for requests that execute within redux)
} : LayoutProps) {
  const router = useRouter();
  const merchantId = router.query.merchantId 
  const dispatch = useDispatch<any>();

  const{isLogin,validateToken} = useAuth();
  const [isClient, setIsClient] = useState(false) // for handling hydration error
  const holdingInfo = useSelector((state:any) => state.holding.holdingInfo);


  //checking existing token
 useEffect(() => {
  if(loginCheck && merchantId && !isLogin()){
    router.push(`/${merchantId}/authenticate/login`)
  }
  setIsClient(true)
 },[merchantId])


 // if user comes to website with any page link except landing page (ex. profile page link),
  // this useEffect execute for getting holding info
   useEffect(() => {
    if(isEmpty(holdingInfo) && merchantId){
      dispatch(fetchHoldingInfo(merchantId))
    }
    },[merchantId])


    // when getting data proccess is within redux and validate token is neccessary for request,
    //  you  should pass apiCode to layout for handling 403 invalid token (ex. profile page)
    useEffect(() => {
      if(apiCode){
        // console.log(apiCode);
        validateToken(apiCode)
      }
    },[apiCode])


  return (
      isClient &&
      <>
      <Navbar/>
      <main className={styles.main}>{children}</main>
      {footer && <Footer />}
      </>
      
  )
}