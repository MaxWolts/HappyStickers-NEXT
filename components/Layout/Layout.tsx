import React from 'react'

import Header from '@components/Header/Header'
import Footer from '@components/Footer/Footer'
import TextInMoving from '@components/TextInMoving/TextInMoving'
import styles from './layout.module.css'

type LayoutProps = {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
      {children}
    <TextInMoving/>
    <Footer />
  </>
)

export default Layout
