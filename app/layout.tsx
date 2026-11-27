import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Providers from './providers'
import '../styles/tokens.css'
import '../global.css'

const headingFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'HappyStickers',
    template: '%s | HappyStickers',
  },
  icons: {
    shortcut: '/images/favicon.ico',
  },
}

type RootLayoutProps = {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="es" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
