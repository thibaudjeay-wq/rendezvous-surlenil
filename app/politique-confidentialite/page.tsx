import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique de confidentialité, Rendez-vous sur le Nil',
  description: 'Politique de confidentialité et de protection des données personnelles de Rendez-vous sur le Nil.',
  robots: { index: false },
  alternates: { canonical: 'https://rendezvous-surlenil.com/politique-confidentialite' },
}

const LAST_UPDATED = '18 mars 2025'
const CONTACT_EMAIL = 'sophie@rendezvous-surlenil.com'
const WHATSAPP = '+33 6 01 31 50 23'

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="py-20 md:py-28" style={{ background: '#FAF7F2', minHeight: '70vh' }}>
      <div className="max-w-[780px] mx-auto px-6 md:px-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-12" style={{ color: '#8A9BAB' }} aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-[#0F3D38] transition-colors">Accueil</Link>
          <span>/</span>
          <span style={{ color: '#0F3D38' }}>Politique de confidentialité</span>
        </nav>

        <h1
          className="mb-3"
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            color: '#0F3D38',
            fontWeight: 300,
            lineHeight: 1.2,
          }}
        >
          Politique de confidentialité
        </h1>
        <p className="mb-14 text-sm" style={{ color: '#8A9BAB' }}>
          Dernière mise à jour : {LAST_UPDATED}
        </p>

        <div className="prose-legal">

          <Section title="Qui sommes-nous ?">
            <p>
              Ce site est édité par <strong>Sophie Godineau</strong>, travel planner indépendante sous l'enseigne
              <strong> Rendez-vous sur le Nil</strong> (<strong>rendezvous-surlenil.com</strong>).
            </p>
            <p>
              Dans le cadre du Règlement Général sur la Protection des Données (RGPD, Règlement UE 2016/679),
              Sophie Godineau agit en qualité de <strong>responsable du traitement</strong> des données personnelles
              collectées via ce site.
            </p>
            <p>
              Contact : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, WhatsApp : <a href="https://wa.me/33601315023" target="_blank" rel="noopener noreferrer">{WHATSAPP}</a>
            </p>
          </Section>

          <Section title="Données collectées et finalités">
            <p>
              Nous collectons uniquement les données strictement nécessaires à la relation commerciale
              et à la préparation de votre voyage. Voici les situations de collecte :
            </p>

            <SubSection title="1. Contact via WhatsApp">
              <p>
                Lorsque vous cliquez sur un bouton « Parlons de votre voyage → » ou « Écrire à Sophie sur WhatsApp »,
                vous êtes redirigé vers l'application WhatsApp (wa.me). Aucune donnée n'est transmise
                à notre serveur à ce stade. Les échanges WhatsApp sont soumis à la politique de confidentialité
                de Meta Platforms Ireland Ltd.
              </p>
              <p>
                <strong>Base légale :</strong> intérêt légitime / exécution d'un contrat (préparation d'un voyage sur mesure).
              </p>
            </SubSection>

            <SubSection title="2. Formulaire de contact (page /contact)">
              <p>
                Le formulaire de contact collecte votre <strong>prénom, email</strong> et le texte de votre message.
                Ces données sont utilisées exclusivement pour vous répondre dans le cadre de votre demande de voyage.
                Elles ne sont pas transmises à des tiers ni utilisées à des fins commerciales non liées à votre demande.
              </p>
              <p>
                <strong>Durée de conservation :</strong> 3 ans à compter du dernier contact.
              </p>
              <p>
                <strong>Base légale :</strong> consentement explicite (soumission du formulaire).
              </p>
            </SubSection>

            <SubSection title="3. Guide Égypte gratuit (lead magnet)">
              <p>
                Pour télécharger notre guide « L'Égypte par Sophie », nous vous demandons votre
                <strong> prénom et adresse email</strong>. En fournissant ces informations, vous consentez
                expressément à :
              </p>
              <ul>
                <li>Recevoir le guide par email ;</li>
                <li>Recevoir ponctuellement des informations sur nos voyages, séjours et actualités
                  (fréquence estimée : 1 à 2 emails par mois maximum).</li>
              </ul>
              <p>
                Vous pouvez vous désinscrire à tout moment via le lien de désinscription présent
                dans chaque email, ou en nous écrivant à {CONTACT_EMAIL}.
              </p>
              <p>
                <strong>Durée de conservation :</strong> jusqu'à désinscription, et au plus 3 ans
                sans interaction de votre part.
              </p>
              <p>
                <strong>Base légale :</strong> consentement explicite (case à cocher ou soumission
                du formulaire avec information claire).
              </p>
            </SubSection>

            <SubSection title="4. Données de navigation (analytics)">
              <p>
                Ce site peut utiliser des outils d'analyse d'audience (Google Analytics, Plausible, ou
                équivalent) afin de mesurer le trafic et améliorer l'expérience utilisateur. Ces outils
                collectent des données anonymisées ou pseudonymisées : pages visitées, durée de session,
                provenance du trafic, type d'appareil.
              </p>
              <p>
                Aucun cookie publicitaire ni de tracking inter-sites n'est utilisé sans votre consentement
                préalable. Si un bandeau de consentement aux cookies est affiché, votre refus sera respecté.
              </p>
              <p>
                <strong>Base légale :</strong> consentement (pour les cookies non essentiels) /
                intérêt légitime (pour les mesures d'audience anonymisées).
              </p>
            </SubSection>
          </Section>

          <Section title="Partage des données">
            <p>
              Nous ne vendons, ne louons et ne cédons jamais vos données personnelles à des tiers.
            </p>
            <p>
              Dans le cadre de la préparation de votre voyage, vos données peuvent être partagées
              avec nos prestataires locaux en Égypte (guides, hôtels, agences partenaires) uniquement
              dans la mesure nécessaire à l'organisation de votre séjour, et avec votre consentement implicite
              dans le cadre du contrat de voyage.
            </p>
            <p>
              Nous utilisons les sous-traitants techniques suivants, tous soumis à des garanties
              contractuelles de protection des données :
            </p>
            <ul>
              <li><strong>Vercel</strong>, hébergement du site (États-Unis, clauses contractuelles types UE)</li>
              <li><strong>Sanity.io</strong>, gestion du contenu éditorial</li>
              <li><strong>Meta / WhatsApp</strong>, messagerie instantanée</li>
              <li>Outil d'emailing (ex. Mailchimp, Brevo ou équivalent) pour l'envoi du guide et des newsletters</li>
            </ul>
          </Section>

          <Section title="Vos droits (RGPD)">
            <p>
              Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants
              concernant vos données personnelles :
            </p>
            <ul>
              <li><strong>Droit d'accès</strong>, obtenir une copie de vos données</li>
              <li><strong>Droit de rectification</strong>, corriger des données inexactes</li>
              <li><strong>Droit à l'effacement</strong>, demander la suppression de vos données (« droit à l'oubli »)</li>
              <li><strong>Droit à la limitation</strong>, restreindre le traitement dans certains cas</li>
              <li><strong>Droit d'opposition</strong>, vous opposer au traitement fondé sur l'intérêt légitime</li>
              <li><strong>Droit à la portabilité</strong>, recevoir vos données dans un format structuré</li>
              <li><strong>Droit de retirer votre consentement</strong> à tout moment, sans affecter la licéité
                du traitement antérieur</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à :{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
            <p>
              En cas de désaccord persistant, vous pouvez introduire une réclamation auprès de la
              <strong> CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) :
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer"> www.cnil.fr</a>
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              Ce site utilise des cookies techniques strictement nécessaires à son fonctionnement
              (ex. : mémorisation de préférences de session). Ces cookies ne nécessitent pas de consentement.
            </p>
            <p>
              D'autres cookies optionnels (analytics, réseaux sociaux) peuvent être déposés si vous
              y consentez. Vous pouvez à tout moment modifier vos préférences via les paramètres de
              votre navigateur ou, le cas échéant, via notre bandeau de gestion des cookies.
            </p>
          </Section>

          <Section title="Sécurité des données">
            <p>
              Nous mettons en œuvre les mesures techniques et organisationnelles appropriées pour
              protéger vos données contre tout accès non autorisé, perte ou altération :
              connexion sécurisée HTTPS, accès restreint aux données, hébergement sur infrastructure certifiée.
            </p>
          </Section>

          <Section title="Transferts hors UE">
            <p>
              Certains de nos sous-traitants (Vercel, Meta/WhatsApp) sont établis aux États-Unis.
              Ces transferts sont encadrés par les clauses contractuelles types approuvées par la Commission
              européenne ou le cadre de protection des données UE-États-Unis (EU-US Data Privacy Framework).
            </p>
          </Section>

          <Section title="Modifications de cette politique">
            <p>
              Cette politique de confidentialité peut être mise à jour à tout moment pour refléter
              l'évolution de nos pratiques ou des obligations légales. La date de dernière mise à jour
              est indiquée en haut de cette page. Nous vous encourageons à la consulter régulièrement.
            </p>
          </Section>

          <Section title="Contact DPO">
            <p>
              Pour toute question relative à la protection de vos données personnelles :
            </p>
            <ul>
              <li>Email : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
              <li>WhatsApp : <a href="https://wa.me/33601315023" target="_blank" rel="noopener noreferrer">{WHATSAPP}</a></li>
            </ul>
            <p>
              Nous nous engageons à répondre à toute demande dans un délai maximum de 30 jours.
            </p>
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
            href="/mentions-legales"
            className="text-sm transition-colors hover:text-[#C4902A]"
            style={{ color: '#5C6E7E' }}
          >
            Mentions légales
          </Link>
        </div>

      </div>
    </main>
  )
}

// ─── Section helpers ──────────────────────────────────────
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-12">
      <h2
        className="mb-5"
        style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
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

function SubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-6">
      <h3
        className="mb-3"
        style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: '1.125rem',
          color: '#0F3D38',
          fontWeight: 500,
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  )
}
