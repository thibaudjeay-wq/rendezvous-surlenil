import Link from 'next/link'
import { getWhatsAppUrl } from '@/lib/constants'

const rows = [
  {
    condition: 'Vous avez des dates et voulez tout confier à Sophie',
    offer: 'Séjour Signature',
    detail: '6 programmes, sur devis',
    href: '/sejours/signature',
  },
  {
    condition: 'Vous voulez voyager autour d\'une passion partagée',
    offer: 'Séjour Privilèges',
    detail: 'Petit groupe, dates fixes',
    href: '/sejours/privileges',
    badge: 'Places limitées',
  },
  {
    condition: 'Vous composez votre itinéraire et cherchez un guide privé',
    offer: 'Escapade Sérénité',
    detail: 'Guide + chauffeur, tarifs affichés',
    href: '/sejours/escapades-serenite',
  },
  {
    condition: 'Vous partez de zéro et voulez un voyage entièrement sur mesure',
    offer: 'Travel Planner',
    detail: 'Itinéraire personnalisé dès 149 €',
    href: '/sur-mesure',
  },
]

const ORIENTATION_WA = getWhatsAppUrl(
  'Bonjour Sophie, je ne sais pas encore quelle formule me correspond. Pouvez-vous m\'aider à choisir ? 🌿'
)

export default function OrientationBlock() {
  return (
    <section
      className="py-16 md:py-20"
      style={{ background: '#FAF7F2' }}
      aria-labelledby="orientation-heading"
    >
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <div className="text-center mb-10 reveal">
          <p className="eyebrow mb-3">Pas encore sûr(e) ?</p>
          <h2
            id="orientation-heading"
            className="text-display-lg title-underline title-underline-center"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#0F3D38' }}
          >
            Quel voyage vous ressemble ?
          </h2>
          <p className="mt-6 text-sm leading-relaxed mx-auto" style={{ color: '#8A9BAB', maxWidth: '440px' }}>
            L&apos;Égypte est multiple. Voici comment s&apos;y retrouver en quelques secondes.
          </p>
        </div>

        {/* Table */}
        <div
          className="rounded-sm overflow-hidden mb-8"
          style={{ border: '1px solid #E8D5B7' }}
        >
          {/* Header */}
          <div
            className="grid grid-cols-2 px-4 sm:px-6 py-3 text-[11px] font-semibold tracking-[0.12em] uppercase"
            style={{ background: '#0F3D38', color: '#C4902A' }}
          >
            <span>Votre situation</span>
            <span>Formule idéale</span>
          </div>

          {rows.map((row, i) => (
            <div
              key={row.href}
              className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-0 px-4 sm:px-6 py-3.5 sm:py-4 group transition-colors"
              style={{
                background: i % 2 === 0 ? 'white' : '#FDFAF5',
                borderTop: i > 0 ? '1px solid #F0E6D3' : undefined,
              }}
            >
              <p className="text-sm leading-relaxed pr-4" style={{ color: '#5C6E7E' }}>
                {row.condition}
              </p>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium" style={{ color: '#0F3D38' }}>
                    {row.offer}
                    {row.badge && (
                      <span
                        className="ml-2 text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded-sm"
                        style={{ background: '#C4902A', color: 'white', verticalAlign: 'middle' }}
                      >
                        {row.badge}
                      </span>
                    )}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#8A9BAB' }}>{row.detail}</p>
                </div>
                <Link
                  href={row.href}
                  className="text-xs font-medium whitespace-nowrap transition-colors hover:text-[#A87820] flex-shrink-0 mt-0.5"
                  style={{ color: '#C4902A' }}
                >
                  Voir →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA de dernier recours */}
        <div className="text-center">
          <a
            href={ORIENTATION_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary inline-flex"
            title="Écrire à Sophie pour choisir la bonne formule"
          >
            Je ne sais pas encore, Sophie m&apos;aide à choisir →
          </a>
          <p className="mt-3 text-xs" style={{ color: '#8A9BAB' }}>
            Réponse sous 24h, en français
          </p>
        </div>
      </div>
    </section>
  )
}
