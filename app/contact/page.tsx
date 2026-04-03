import type { Metadata } from 'next'
import { getWhatsAppUrl, CONTACT_EMAIL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact, Parlons de votre voyage en Égypte | Rendez-vous sur le Nil',
  description:
    'Prenez contact avec Sophie directement sur WhatsApp. Pas de formulaire, pas d\'attente, une conversation, et votre voyage commence.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
}

const WHATSAPP_CONTACT = getWhatsAppUrl(
  "Bonjour Sophie, j'ai découvert Rendez-vous sur le Nil et je souhaite échanger avec vous sur un projet de voyage en Égypte. Pouvez-vous me dire quand vous êtes disponible pour un appel ?"
)

const faqs = [
  {
    q: 'Comment se passe le premier échange ?',
    a: 'Vous m\'envoyez un message WhatsApp avec les grandes lignes de votre projet (dates, nombre de personnes, ce que vous aimez). Je vous réponds dans la journée, et on fixe un appel si vous le souhaitez.',
  },
  {
    q: 'Est-ce que je peux vous appeler directement ?',
    a: 'Oui, bien sûr. Mais je recommande de commencer par un message pour que je sois disponible pour vous. Le WhatsApp permet aussi de partager des photos, des inspirations, des liens, c\'est pratique pour démarrer.',
  },
  {
    q: 'Dans quel délai répondez-vous ?',
    a: 'Généralement le jour même, sauf le vendredi soir et le samedi (mes journées de visite terrain). Dans ce cas, le lundi matin au plus tard.',
  },
  {
    q: 'Est-ce que le premier échange est payant ?',
    a: 'Non, le premier échange est toujours gratuit. Je prends le temps de comprendre votre projet avant de vous proposer quoi que ce soit.',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #0F3D38 0%, #2A5A54 100%)',
          paddingTop: '140px',
          paddingBottom: '80px',
        }}
        aria-label="Prenez contact avec Sophie"
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #C4902A 0%, transparent 70%)',
            transform: 'translate(30%, -30%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center relative">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div style={{ width: '32px', height: '1px', background: '#C4902A' }} />
            <span className="eyebrow" style={{ color: '#CE8D5C' }}>
              Contact
            </span>
            <div style={{ width: '32px', height: '1px', background: '#C4902A' }} />
          </div>

          <h1
            className="text-display-xl mb-6"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              color: 'white',
              fontWeight: 300,
              lineHeight: 1.1,
            }}
          >
            Votre voyage commence
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#CE8D5C' }}>
              par un message
            </em>
          </h1>

          <p
            className="text-lg leading-relaxed mx-auto mb-4"
            style={{ color: 'rgba(250,247,242,0.75)', maxWidth: '520px', fontWeight: 300 }}
          >
            Pas de formulaire. Pas de délai d&apos;attente. Juste Sophie, disponible sur WhatsApp pour parler de votre projet.
          </p>
        </div>
      </section>

      {/* ─── BLOC WHATSAPP PRINCIPAL ─────────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{ background: '#FDF8F0' }}
        aria-labelledby="whatsapp-heading"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Carte principale WhatsApp */}
            <div
              className="p-10 rounded-sm text-center flex flex-col items-center"
              style={{
                background: 'white',
                border: '1px solid #E8D5B7',
                boxShadow: '0 8px 40px rgba(13,33,55,0.08)',
              }}
            >
              {/* Icône WhatsApp */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)' }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>

              <p
                className="text-2xl font-light mb-2"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#0F3D38' }}
              >
                Écrivez à Sophie
              </p>
              <p className="text-sm mb-8" style={{ color: '#8A9BAB' }}>
                Réponse dans la journée · En français
              </p>

              <a
                href={WHATSAPP_CONTACT}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full justify-center text-center"
                style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Parlons de votre voyage →
              </a>

              <div
                className="mt-8 pt-8 w-full text-center"
                style={{ borderTop: '1px solid #E8D5B7' }}
              >
                <p className="text-xs mb-2" style={{ color: '#8A9BAB', letterSpacing: '0.04em' }}>
                  Ou par email, si vous préférez
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-sm"
                  style={{ color: '#5C6E7E', textDecoration: 'underline', textDecorationColor: '#E8D5B7' }}
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            {/* Infos et rassurance */}
            <div>
              <p className="eyebrow mb-4">Comment ça se passe</p>
              <h2
                id="whatsapp-heading"
                className="text-display-lg title-underline mb-8"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#0F3D38' }}
              >
                Simple, direct
                <br />
                <em style={{ fontStyle: 'italic', fontWeight: 300 }}>sans intermédiaire</em>
              </h2>

              <div className="space-y-6">
                {[
                  {
                    step: '01',
                    title: 'Vous m\'envoyez un message',
                    text: 'Dites-moi en quelques lignes votre projet : dates envisagées, nombre de voyageurs, vos envies. Pas besoin d\'un plan détaillé, juste votre envie.',
                  },
                  {
                    step: '02',
                    title: 'Je vous réponds dans la journée',
                    text: 'Je lis votre message et je vous réponds personnellement. Si votre projet m\'inspire et que je peux vous aider, je vous propose un appel.',
                  },
                  {
                    step: '03',
                    title: 'On construit votre voyage ensemble',
                    text: 'Si le courant passe, on part de vos envies pour dessiner un itinéraire sur mesure. Rien n\'est standard, rien n\'est précipité.',
                  },
                ].map(({ step, title, text }) => (
                  <div key={step} className="flex gap-5">
                    <div className="flex-shrink-0 pt-1">
                      <span
                        className="text-3xl font-light"
                        style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#E8D5B7' }}
                        aria-hidden="true"
                      >
                        {step}
                      </span>
                    </div>
                    <div>
                      <h3
                        className="font-medium mb-1"
                        style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.1rem', color: '#0F3D38' }}
                      >
                        {title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#5C6E7E' }}>
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────── */}
      <section
        className="py-16 md:py-24"
        style={{ background: '#FAF7F2' }}
        aria-labelledby="faq-contact-heading"
      >
        <div className="max-w-[760px] mx-auto px-6 md:px-12">
          <h2
            id="faq-contact-heading"
            className="text-display-lg title-underline title-underline-center text-center mb-12"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#0F3D38' }}
          >
            Questions fréquentes
          </h2>

          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group"
                style={{ borderBottom: '1px solid #E8D5B7' }}
              >
                <style>{`
                  details summary { list-style: none; }
                  details summary::-webkit-details-marker { display: none; }
                  details[open] summary .faq-chevron { transform: rotate(180deg); }
                `}</style>
                <summary
                  className="flex items-center justify-between gap-4 py-5 cursor-pointer"
                  style={{ color: '#0F3D38' }}
                >
                  <span
                    className="font-medium text-base"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.0625rem' }}
                  >
                    {q}
                  </span>
                  <span
                    className="faq-chevron flex-shrink-0 text-[#C4902A] transition-transform duration-200"
                    aria-hidden="true"
                  >
                    ↓
                  </span>
                </summary>
                <div className="pb-5">
                  <p className="text-sm leading-relaxed" style={{ color: '#5C6E7E' }}>
                    {a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
