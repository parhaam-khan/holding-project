import Navbar from './navbar'
import Footer from './footer'
import styles from './layout.module.scss'
import { LayoutProps } from '@/types'



export default function Layout({ children,holdingInfo } : LayoutProps) {

  return (
    <>
      <Navbar holdingInfo={holdingInfo}/>
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  )
}