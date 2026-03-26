import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
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
    images: [{ url: 'https://images.unsplash.com/photo-1539768942893-daf853948e5e?w=1200&q=85', width: 1200, height: 630, alt: 'Rendez-vous sur le Nil, Croisière sur le Nil au coucher du soleil' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rendez-vous sur le Nil',
    description: 'Voyages premium en Égypte, Croisières dahabiya & séjours sur mesure',
  },
  robots: { index: true, follow: true },
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
      </body>
    </html>
  )
}
