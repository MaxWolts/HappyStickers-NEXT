import { AppProps } from 'next/app'
import Head from 'next/head'
import '../global.css'
import CartProvider from '../store/Cart'

// export function reportWebVitals(metric) {
//   console.log(metric)
// }

const MyApp = ({ Component, pageProps }: AppProps) => {
  // Aditional props
  // Aditional layout
  // Manejar errores - componentDidCatch
  return (
      <CartProvider>
        <Head>
          <link rel="shortcut icon" href='@images/favicon.ico'></link>
          <title>HappyStickers</title>
        </Head>
        <Component {...pageProps} />
      </CartProvider>
  )
}

export default MyApp
