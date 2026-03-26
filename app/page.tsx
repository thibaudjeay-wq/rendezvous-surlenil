import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import ReassuranceBar from '@/components/home/ReassuranceBar'
import AboutSophie from '@/components/home/AboutSophie'
import LeadMagnet from '@/components/home/LeadMagnet'
import OurUniverse from '@/components/home/OurUniverse'
import FeaturedDahabiya from '@/components/home/FeaturedDahabiya'
import OrientationBlock from '@/components/home/OrientationBlock'
import HowItWorks from '@/components/home/HowItWorks'
import WhyUs from '@/components/home/WhyUs'
import Testimonials from '@/components/home/Testimonials'
import QuizModal from '@/components/quiz/QuizModal'

export const metadata: Metadata = {
  title: 'Croisière Dahabiya sur le Nil & Séjours Haut de Gamme | Rendez-vous sur le Nil',
  description:
    'Croisière en dahabiya privatisée, séjours signature et voyages sur mesure en Égypte. Sophie & Nasser vous emmènent dans une Égypte secrète, depuis Louxor.',
  alternates: {
    canonical: 'https://rendezvous-surlenil.com',
  },
}

// JSON-LD, Agence de voyages (TouristAgency)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TouristAgency',
  name: 'Rendez-vous sur le Nil',
  description: 'Voyages premium en Égypte, Croisières dahabiya, séjours signature et sur mesure.',
  url: 'https://rendezvous-surlenil.com',
  telephone: '+33601315023',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'EG',
    addressLocality: 'Louxor',
  },
  areaServed: 'Egypt',
  priceRange: '€€€',
  sameAs: [
    'https://www.instagram.com/rendez-vous-sur-le-nil',
    'https://www.facebook.com/rendez-vous-sur-le-nil',
  ],
}

export default function HomePage() {
  return (
    <>
      {/* JSON-LD structuré */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero, accroche + preuve sociale immédiate */}
      <Hero />

      {/* 2. Réassurance, confiance en 6 signaux */}
      <ReassuranceBar />

      {/* 3. Sophie & Nasser, qui parle avant de vendre */}
      <AboutSophie />

      {/* 4. Témoignages, preuve sociale juste après Sophie */}
      <Testimonials />

      {/* 5. Lead magnet, intercept avant de décider */}
      <LeadMagnet />

      {/* 6. Nos univers, les offres, maintenant qu'on a confiance */}
      <OurUniverse />

      {/* 6. Dahabiya, l'expérience phare */}
      <FeaturedDahabiya />

      {/* 7. Orientation, aide au choix de la bonne formule */}
      <OrientationBlock />

      {/* 8. Comment ça se passe, processus rassurant */}
      <HowItWorks />

      {/* 10. Preuves qualitatives */}
      <WhyUs />

      {/* Quiz flottant, accessible à tout moment */}
      <QuizModal />
    </>
  )
}
