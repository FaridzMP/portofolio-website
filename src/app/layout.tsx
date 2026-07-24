import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from '@/components/Theme/Theme'
import { Fraunces, DM_Sans, JetBrains_Mono } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Faridz MP — Full-Stack Developer',
  description: 'Portfolio website Faridz MP, Full-Stack Developer spesialis React, Next.js, dan Node.js berbasis Bandung, Indonesia.',
  keywords: ['Full-Stack Developer', 'React', 'Next.js', 'Node.js', 'TypeScript', 'Bandung'],
  authors: [{ name: 'Faridz Muhamad Permana' }],
  creator: 'Faridz MP',
  openGraph: {
    title: 'Faridz MP — Full-Stack Developer',
    description: 'Full-Stack Developer spesialis React, Next.js, dan Node.js',
    type: 'website',
    locale: 'id_ID',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${fraunces.variable} ${dmSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="bg-ink text-cream antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}