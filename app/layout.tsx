import type { Metadata } from 'next'
import Providers from './providers'
import '../global.css'

export const metadata: Metadata = {
  title: 'HappyStickers',
  icons: {
    shortcut: '/images/favicon.ico',
  },
}

type RootLayoutProps = {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
