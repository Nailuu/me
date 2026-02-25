import type { Metadata } from 'next'
import { Onest, IBM_Plex_Mono } from 'next/font/google'
import { Navbar } from '@/app/components/nav'
import Footer from '@/app/components/footer'
import { ThemeProvider } from '@/app/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { siteConfig } from '@/app/config'
import './globals.css'

const onest = Onest({
  variable: '--font-onest',
  subsets: ['latin'],
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.baseUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`scheme-light dark:scheme-dark bg-background text-foreground ${onest.variable} ${ibmPlexMono.variable}`}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
            <Navbar />
            {children}
            <Footer />
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
