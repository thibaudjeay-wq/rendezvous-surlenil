import Image from 'next/image'
import Link from 'next/link'
import { Ship, Users, Star, Sunset } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/constants'

const highlights = [
  { icon: Ship, label: 'Format', value: 'Petit groupe ou privatisé' },
  { icon: Users, label: 'Capacité', value: 'Jusqu\'à 12 voyageurs' },
  { icon: Star, label: 'Durée', value: '4 à 14 nuits' },
  { icon: Sunset, label: 'Trajet', value: 'Louxor → Assouan' },
]

const whatsappMessage = 'Bonjour Sophie, je suis intéressé(e) par une croisière en dahabiya sur le Nil. Pouvez-vous m\'en dire plus ? 🛶'

export default function FeaturedDahabiya() {
  return (
    <section
      className="py-20 md:py-28"
      style={{ background: '#FAF7F2' }}
      aria-labelledby="dahabiya-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Images, côté gauche */}
          <div className="relative reveal-left">
            <div className="img-portrait-lg overflow-hidden rounded-sm img-zoom">
              <Image
                src="/photos/dahabiya/dahabiya-voiles-rayees.jpg"
                alt="Dahabiya en navigation sur le Nil avec ses voiles rayées orange et blanc, Rendez-vous sur le Nil"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>

            {/* Image secondaire flottante */}
            <div
              className="hidden sm:block absolute -bottom-6 -right-4 lg:-right-8 w-48 md:w-56 rounded-sm shadow-xl overflow-hidden"
              style={{ border: '4px solid #FAF7F2' }}
            >
              <div className="img-square">
                <Image
                  src="/photos/dahabiya/pont-salon-dahabiya.jpg"
                  alt="Salon intérieur de la dahabiya sur le Nil"
                  fill
                  sizes="224px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Badge */}
            <div
              className="hidden sm:block absolute top-6 -right-4 lg:-right-6 px-4 py-3 shadow-lg"
              style={{ background: '#0F3D38', borderRadius: '2px' }}
            >
              <p className="text-[10px] tracking-[0.14em] uppercase mb-1" style={{ color: '#C4902A' }}>
                Sur le Nil
              </p>
              <p className="text-sm font-medium" style={{ color: 'white', fontFamily: 'Cormorant Garamond' }}>
                La Dahabiya
              </p>
            </div>
          </div>

          {/* Texte, côté droit */}
          <div className="lg:py-8 reveal-right">
            <p className="eyebrow mb-4">L&apos;expérience phare</p>
            <h2
              id="dahabiya-heading"
              className="text-display-lg title-underline mb-8"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#0F3D38' }}
            >
              Naviguer sur le Nil
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 300 }}>à bord d&apos;une dahabiya</em>
            </h2>

            <p className="leading-relaxed mb-10" style={{ color: '#5C6E7E', fontSize: '1.0625rem' }}>
              La dahabiya glisse sur le Nil sans moteur, poussée par le vent du soir.
              Vous dînez sur le pont pendant que les berges défilent, palmiers, temples en grès rose,
              villages nubiens silencieux. C&apos;est le Nil comme il existait avant les croisières
              de masse : lent, intime, à taille humaine.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {highlights.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-4"
                  style={{ background: '#FDF8F0', border: '1px solid #E8D5B7', borderRadius: '2px' }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: '#F7EDD8' }}
                  >
                    <Icon size={15} style={{ color: '#C4902A' }} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-0.5" style={{ color: '#8A9BAB', letterSpacing: '0.04em' }}>
                      {label}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: '#0F3D38' }}>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/croisieres-dahabiya" className="btn btn-primary">
                Découvrir la croisière
              </Link>
              <a
                href={getWhatsAppUrl(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                title="Écrire à Sophie pour une croisière dahabiya"
              >
                Poser une question à Sophie →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
