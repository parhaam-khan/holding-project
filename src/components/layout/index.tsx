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



export default function Layout({ children,footer=true,loginCheck = false,apiCode } : LayoutProps) {
  const router = useRouter();
  const merchantId = router.query.merchantId 
  const dispatch = useDispatch<any>();

  const{isLogin,validateToken} = useAuth();
  const [isClient, setIsClient] = useState(false)
  const holdingInfo = useSelector((state:any) => state.holding.holdingInfo);

 useEffect(() => {
  if(loginCheck && !isLogin()){
    router.push(`/${merchantId}/authenticate/login`)
  }
  setIsClient(true)
 },[])

  useEffect(() => {
    if(isEmpty(holdingInfo) && merchantId){
      dispatch(fetchHoldingInfo(merchantId))
    }
    },[merchantId])

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