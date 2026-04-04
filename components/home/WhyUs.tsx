import { MapPinned, Languages, Handshake, ShieldCheck } from 'lucide-react'

const args = [
  {
    icon: MapPinned,
    title: 'Deux regards, une Égypte inédite',
    description:
      'Sophie Godineau a une connaissance intime du terrain égyptien. Nasser y est né. Ensemble, ils vous ouvrent des portes inaccessibles aux circuits classiques : temples peu connus, bateliers de confiance, guides soigneusement sélectionnés.',
  },
  {
    icon: Languages,
    title: 'Un fil francophone de A à Z',
    description:
      'Vous ne gérez rien. Sophie vous accompagne dès la première question jusqu\'à votre retour : itinéraire, logistique, questions pratiques, imprévus. En français, de 10h à 19h.',
  },
  {
    icon: Handshake,
    title: 'Votre voyage, pas un catalogue',
    description:
      'Pas de circuit de masse, pas de programme imposé. Chaque séjour est conçu sur mesure, pour votre rythme, vos désirs, votre façon d\'être en voyage. L\'Égypte que vous avez toujours imaginée.',
  },
  {
    icon: ShieldCheck,
    title: 'Sérénité totale, du départ au retour',
    description:
      'Transferts, hébergements d\'exception, guides locaux triés sur le volet, billets, restauration, situations imprévues : tout est anticipé. Vous n\'avez qu\'une chose à faire, vivre le moment.',
  },
]

export default function WhyUs() {
  return (
    <section
      className="py-20 md:py-28"
      style={{ background: '#0F3D38' }}
      aria-labelledby="whyus-heading"
    >
      <style>{`
        .whyus-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          transition: background 0.3s, border-color 0.3s;
        }
        .whyus-card:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(201,169,110,0.3);
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>Notre ADN</p>
          <h2
            id="whyus-heading"
            className="text-display-lg title-underline title-underline-center"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#FAF7F2' }}
          >
            Une Égypte magique, sereine
            <br />
            <em style={{ fontStyle: 'italic', color: '#CE8D5C' }}>à votre image</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {args.map(({ icon: Icon, title, description }, i) => (
            <div key={title} className={`whyus-card flex gap-5 p-7 rounded-sm-delay-${i + 1}`}>
              <div className="flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.3)' }}
                >
                  <Icon size={20} style={{ color: '#C4902A' }} aria-hidden="true" />
                </div>
              </div>
              <div>
                <h3
                  className="font-medium mb-2"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.1875rem', color: '#FAF7F2' }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8A9BAB' }}>
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
