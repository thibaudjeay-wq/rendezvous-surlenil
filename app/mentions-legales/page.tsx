import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mentions légales, Rendez-vous sur le Nil',
  description: 'Mentions légales de Rendez-vous sur le Nil, agence de voyages premium en Égypte.',
  robots: { index: false },
  alternates: { canonical: 'https://rendezvous-surlenil.com/mentions-legales' },
}

export default function MentionsLegalesPage() {
  return (
    <main className="py-20 md:py-28" style={{ background: '#FAF7F2', minHeight: '70vh' }}>
      <div className="max-w-[780px] mx-auto px-6 md:px-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-12" style={{ color: '#8A9BAB' }} aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-[#0F3D38] transition-colors">Accueil</Link>
          <span>/</span>
          <span style={{ color: '#0F3D38' }}>Mentions légales</span>
        </nav>

        <h1
          className="mb-14"
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            color: '#0F3D38',
            fontWeight: 300,
            lineHeight: 1.2,
          }}
        >
          Mentions légales
        </h1>

        <div className="prose-legal">

          <Section title="Éditeur du site">
            <p>Le site <strong>rendezvous-surlenil.com</strong> est édité par :</p>
            <ul>
              <li><strong>Sophie Godineau</strong>, travel planner indépendante</li>
              <li>Activité exercée en tant qu'auto-entrepreneur / entreprise individuelle</li>
              <li>Basée à Louxor, Égypte, et en France</li>
              <li>Email : <a href="mailto:sophie@rendezvous-surlenil.com">sophie@rendezvous-surlenil.com</a></li>
              <li>Contact WhatsApp : <a href="https://wa.me/33601315023" target="_blank" rel="noopener noreferrer">+33 6 01 31 50 23</a></li>
            </ul>
            <p style={{ marginTop: '1rem', fontSize: '0.9375rem', color: '#8A9BAB' }}>
              Numéro SIRET et immatriculation Atout France communiqués sur demande.
            </p>
          </Section>

          <Section title="Hébergement">
            <ul>
              <li><strong>Vercel Inc.</strong></li>
              <li>340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</li>
              <li>Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a></li>
            </ul>
          </Section>

          <Section title="Propriété intellectuelle">
            <p>
              L'ensemble des contenus présents sur ce site (textes, photographies, logotypes, charte graphique, structure)
              sont la propriété exclusive de Sophie Godineau ou font l'objet d'une licence d'utilisation accordée à cette dernière.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication ou adaptation, partielle ou intégrale,
              des éléments du site est strictement interdite sans l'accord préalable écrit de l'éditeur,
              sous peine de poursuites judiciaires.
            </p>
            <p>
              Les photographies présentes sur ce site proviennent en partie de banques d'images libres de droits
              (Unsplash) et en partie de la collection personnelle de Sophie Godineau & Nasser.
            </p>
          </Section>

          <Section title="Responsabilité">
            <p>
              Rendez-vous sur le Nil s'efforce de maintenir les informations publiées sur ce site aussi exactes
              et à jour que possible. Toutefois, nous ne pouvons garantir l'exactitude, la complétude ou l'actualité
              des informations diffusées sur ce site.
            </p>
            <p>
              Les informations relatives aux tarifs, disponibilités et prestations sont données à titre indicatif
              et susceptibles d'évoluer. Seul l'échange direct avec Sophie Godineau fait foi pour la confirmation
              d'un voyage.
            </p>
            <p>
              Ce site peut contenir des liens vers des sites tiers. Rendez-vous sur le Nil ne contrôle pas ces sites
              et décline toute responsabilité quant à leur contenu.
            </p>
          </Section>

          <Section title="Droit applicable">
            <p>
              Les présentes mentions légales sont soumises au droit français.
              Tout litige relatif à l'utilisation de ce site relève de la compétence exclusive des tribunaux français.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Pour toute question relative à ce site ou aux présentes mentions légales :
            </p>
            <ul>
              <li>Email : <a href="mailto:sophie@rendezvous-surlenil.com">sophie@rendezvous-surlenil.com</a></li>
              <li>WhatsApp : <a href="https://wa.me/33601315023" target="_blank" rel="noopener noreferrer">+33 6 01 31 50 23</a></li>
            </ul>
          </Section>

        </div>

        {/* Retour */}
        <div className="mt-16 pt-8" style={{ borderTop: '1px solid #E8D5B7' }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#C4902A]"
            style={{ color: '#5C6E7E' }}
          >
            ← Retour à l'accueil
          </Link>
          <span className="mx-4" style={{ color: '#E8D5B7' }}>·</span>
          <Link
            href="/politique-confidentialite"
            className="text-sm transition-colors hover:text-[#C4902A]"
            style={{ color: '#5C6E7E' }}
          >
            Politique de confidentialité
          </Link>
        </div>

      </div>
    </main>
  )
}

// ─── Section helper ───────────────────────────────────────
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-12">
      <h2
        className="mb-5"
        style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: '1.375rem',
          color: '#0F3D38',
          fontWeight: 500,
          paddingBottom: '0.625rem',
          borderBottom: '1px solid #E8D5B7',
        }}
      >
        {title}
      </h2>
      <div className="legal-body">
        {children}
      </div>
    </section>
  )
}
