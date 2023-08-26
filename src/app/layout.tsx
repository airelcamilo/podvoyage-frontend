import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import HomeComponent from '@/components/HomeComponent';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Podvoyage',
  description: 'Podcast listening app',
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="en">
      <head>
        <title>Podvoyage</title>
      </head>
      <body className={inter.className}>
        <HomeComponent>
          {children}
        </HomeComponent>
      </body>
    </html>
  )
}

export default RootLayout;