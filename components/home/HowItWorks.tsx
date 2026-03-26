import { getWhatsAppUrl } from '@/lib/constants'

const steps = [
  {
    number: '01',
    title: 'Vous nous parlez de vous',
    body: 'Un message WhatsApp ou un appel de 20 minutes, gratuit, sans engagement. Vos envies, vos dates, ce qui vous fait vibrer en voyage. Sophie écoute vraiment.',
  },
  {
    number: '02',
    title: 'Sophie construit votre voyage',
    body: 'En 48h, une première proposition arrive : itinéraire, hébergements sélectionnés, guides, rythme. Rien n\'est gravé dans le marbre, vous ajustez, elle affine.',
  },
  {
    number: '03',
    title: 'Vous validez, elle organise',
    body: 'Sophie gère chaque réservation, chaque transfert, chaque coordination locale. Vous n\'avez qu\'à préparer vos valises.',
  },
  {
    number: '04',
    title: 'Vous partez. Elle veille.',
    body: 'Les imprévus sont réglés avant même que vous les ressentiez.',
  },
]

const HOW_WA = getWhatsAppUrl(
  'Bonjour Sophie, je souhaite commencer à organiser un voyage en Égypte. Pouvez-vous me dire quand vous êtes disponible pour un premier échange ? 🌿'
)

export default function HowItWorks() {
  return (
    <section
      className="py-20 md:py-28"
      style={{ background: '#FDF8F0' }}
      aria-labelledby="how-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16 reveal">
          <p className="eyebrow mb-4">Notre approche</p>
          <h2
            id="how-heading"
            className="text-display-lg title-underline title-underline-center"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#0F3D38' }}
          >
            Comment ça se passe
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 300 }}>concrètement ?</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {steps.map(({ number, title, body }, i) => (
            <div key={number} className={`relative reveal reveal-delay-${i + 1}`}>
              {/* Connecteur horizontal (desktop) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-8 left-full w-full z-0"
                  style={{ height: '1px', background: 'linear-gradient(to right, #E8D5B7, transparent)', transform: 'translateX(-50%)' }}
                  aria-hidden="true"
                />
              )}

              <div
                className="p-6 rounded-sm h-full"
                style={{ background: 'white', border: '1px solid #E8D5B7' }}
              >
                <p
                  className="mb-4"
                  style={{
                    fontFamily: 'Cormorant Garamond',
                    fontSize: '3rem',
                    color: '#F0E6D3',
                    lineHeight: 1,
                    fontWeight: 300,
                  }}
                  aria-hidden="true"
                >
                  {number}
                </p>
                <h3
                  className="mb-3 font-medium"
                  style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.1875rem', color: '#0F3D38' }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5C6E7E' }}>
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Note de réassurance */}
        <div className="mt-10 text-center">
          <p
            className="text-sm italic mb-8"
            style={{ color: '#8A9BAB', fontFamily: 'Cormorant Garamond', fontSize: '1.0625rem' }}
          >
            Aucun acompte demandé avant que le voyage vous convienne.
          </p>
          <a
            href={HOW_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp inline-flex"
            title="Commencer à organiser son voyage en Égypte avec Sophie"
          >
            Commencer par un message à Sophie →
          </a>
          <p className="mt-3 text-xs" style={{ color: '#8A9BAB' }}>
            Réponse sous 24h, en français
          </p>
        </div>
      </div>
    </section>
  )
}
