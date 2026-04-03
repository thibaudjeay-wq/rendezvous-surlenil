import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import ScrollReveal from '@/components/layout/ScrollReveal'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Rendez-vous sur le Nil, Voyages premium en Égypte',
    template: '%s | Rendez-vous sur le Nil',
  },
  description:
    'Croisières en dahabiya, séjours signature et voyages sur mesure en Égypte. Sophie Godineau vous accompagne pour une expérience authentique, haut de gamme et inoubliable.',
  keywords: ['voyage Égypte', 'croisière dahabiya', 'séjour Louxor', 'Égypte sur mesure', 'voyage premium Égypte'],
  authors: [{ name: 'Rendez-vous sur le Nil' }],
  creator: 'Rendez-vous sur le Nil',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://rendezvous-surlenil.com',
    siteName: 'Rendez-vous sur le Nil',
    title: 'Rendez-vous sur le Nil, Voyages premium en Égypte',
    description:
      'Croisières en dahabiya, séjours signature et voyages sur mesure en Égypte avec Sophie Godineau.',
    images: [{ url: 'https://rendezvous-surlenil.com/og-image.png', width: 1200, height: 630, alt: 'Rendez-vous sur le Nil, Voyages premium en Égypte' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rendez-vous sur le Nil',
    description: 'Voyages premium en Égypte, Croisières dahabiya & séjours sur mesure',
  },
  robots: { index: true, follow: true },
  verification: {
    google: 'MHUoDAUFSSo7tHleYhxmbodwungdzkI_gYKrhhB2cCI',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <ScrollReveal />
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3BR59P7TXJ" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3BR59P7TXJ');
        `}</Script>
      </body>
    </html>
  )
}
