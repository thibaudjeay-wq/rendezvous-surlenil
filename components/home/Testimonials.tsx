const items = [
  { name: 'Maurice', quote: 'De tous mes voyages, je te mets sur la première marche.' },
  { name: 'Annie', quote: "J'ai enfin pu réaliser le voyage dont je rêvais et je me suis sentie en totale sécurité." },
  { name: 'Véronique', quote: "Plus riche, plus merveilleux encore que ce que j'imaginais." },
  { name: 'Christine & Jean-Marc', quote: 'La Thébaïde est un havre de paix… une semaine merveilleuse.' },
  { name: 'Allan', quote: 'Not just our travel agents, we feel like we made new friends.' },
  { name: 'Elisabeth', quote: 'Des moments exceptionnels… une organisation parfaite.' },
  { name: 'Mireille & Anaïs', quote: 'Croisière unique et intime… équipage bienveillant.' },
  { name: 'Nelly, Lucas & Victor', quote: 'Un voyage sur mesure, authentique et immersif.' },
  { name: 'Nicolas & famille', quote: 'Une croisière très confortable avec un personnel attentionné.' },
  { name: 'Patricia & Anne-Marie', quote: "Nous gardons d'excellents souvenirs… merci pour votre écoute." },
]

export default function Testimonials() {
  const all = [...items, ...items]

  return (
    <section
      className="overflow-hidden"
      style={{
        background: '#FAF7F2',
        borderTop: '1px solid #E8D5B7',
        borderBottom: '1px solid #E8D5B7',
        paddingTop: '5rem',
        paddingBottom: '5rem',
      }}
      aria-labelledby="testimonials-heading"
    >
      {/* Header */}
      <div className="text-center mb-14 px-6 reveal">
        <p className="eyebrow mb-4">Ils l&apos;ont vécu</p>
        <h2
          id="testimonials-heading"
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(1.625rem, 3vw, 2.375rem)',
            color: '#0F3D38',
            fontWeight: 300,
            lineHeight: 1.2,
          }}
        >
          Ce que nos voyageurs
          <br />
          <em style={{ fontWeight: 400, fontStyle: 'italic' }}>ont dit à Sophie</em>
        </h2>
      </div>

      {/* Accessible fallback, screen readers only */}
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item.name}>
            <blockquote>
              <p>{item.quote}</p>
              <footer>{item.name}</footer>
            </blockquote>
          </li>
        ))}
      </ul>

      {/* Marquee, visual only */}
      <div className="marquee-viewport" aria-hidden="true">
        <div
          className="marquee-track"
          style={{ animationDuration: '55s' }}
        >
          {all.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="flex items-center flex-shrink-0"
            >
              {/* Quote card */}
              <div
                style={{
                  paddingLeft: '2.5rem',
                  paddingRight: '2.5rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  minWidth: '260px',
                  maxWidth: '380px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '1.0625rem',
                    fontStyle: 'italic',
                    color: '#0F3D38',
                    lineHeight: 1.62,
                    fontWeight: 400,
                  }}
                >
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p
                  style={{
                    marginTop: '0.625rem',
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    letterSpacing: '0.13em',
                    textTransform: 'uppercase',
                    color: '#C4902A',
                  }}
                >
                 , {item.name}
                </p>
              </div>

              {/* Separator */}
              <div
                style={{
                  width: '1px',
                  height: '40px',
                  background: '#DDD0BC',
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
