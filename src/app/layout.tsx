import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import type { Metadata } from 'next'
import { Bricolage_Grotesque, Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '3dayMVP Checkout Module Test',
  description: 'Self-hosted ERC-20 checkout module',
}

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage-grotesque',
})

const geistVariable = localFont({
  variable: '--font-geist-variable',
  src: [
    {
      path: '../lib/fonts/GeistVF.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../lib/fonts/GeistVF.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, bricolage.variable, geistVariable.variable)}>{children}</body>
    </html>
  )
}
