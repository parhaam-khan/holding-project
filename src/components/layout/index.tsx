import Navbar from './navbar'
import Footer from './footer'
import styles from './layout.module.scss'
import { Props } from '@/types'



export default function Layout({ children } : Props) {

  return (
    <>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  )
}