import Navbar from './navbar'
import Footer from './footer'
import { ReactNode } from 'react'
import styles from './layout.module.scss'

interface Props {
  children?: ReactNode
}

export default function Layout({ children } : Props) {

  return (
    <>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  )
}