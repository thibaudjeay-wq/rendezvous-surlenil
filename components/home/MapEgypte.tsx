import Image from 'next/image'

export default function MapEgypte() {
  return (
    <section
      className="py-20 md:py-28"
      style={{ background: '#FAF7F2' }}
      aria-labelledby="carte-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <p className="eyebrow mb-4">Notre terrain</p>
          <h2
            id="carte-heading"
            className="title-underline title-underline-center"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: '#0F3D38',
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            De Louxor au désert,
            <br />
            <em style={{ fontWeight: 300, fontStyle: 'italic' }}>nous connaissons l&apos;Égypte de l&apos;intérieur</em>
          </h2>
        </div>

        <div
          className="relative overflow-hidden rounded-sm mx-auto"
          style={{ maxWidth: '860px', border: '1px solid #E8D5B7', boxShadow: '0 8px 32px rgba(15,61,56,0.08)' }}
        >
          <Image
            src="/photos/carte-egypte.png"
            alt="Carte des destinations Rendez-vous sur le Nil — Louxor, Assouan, Siwa, désert blanc, Le Caire"
            width={2000}
            height={1414}
            sizes="(max-width: 860px) 100vw, 860px"
            className="w-full h-auto"
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </section>
  )
}
