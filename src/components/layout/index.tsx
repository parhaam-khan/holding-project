import Navbar from './navbar'
import Footer from './footer'
import styles from './layout.module.scss'
import { Props } from '@/types'



export default function Layout({ children,holdingInfo } : Props) {

  return (
    <>
      <Navbar holdingInfo={holdingInfo}/>
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  )
}