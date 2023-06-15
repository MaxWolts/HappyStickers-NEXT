import React from 'react'

import Header from '@components/Header/Header'
import Footer from '@components/Footer/Footer'
import styles from './layout.module.css'
import Marquee from '@components/Marquee/Marquee'

type LayoutProps = {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
      {children}
    <Marquee text={"HappySticker simpre contigo -"}/>
    <Footer />
  </>
)

export default Layout
