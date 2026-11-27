import Header from '@components/Header/Header'
import Footer from '@components/Footer/Footer'
import MarqueeBand from '@components/Marquee/MarqueeBand'
import styles from './styles.module.css'

type LayoutProps = {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <a href="#main" className={styles.skipLink}>
      Saltar al contenido
    </a>
    <Header />
    <main id="main" tabIndex={-1} className={styles.main}>
      {children}
    </main>
    <MarqueeBand text="HappyStickers siempre contigo" />
    <Footer />
  </>
)

export default Layout
