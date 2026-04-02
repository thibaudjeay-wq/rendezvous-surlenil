'use client'

import Link from 'next/link'
import { FOOTER_LINKS, WHATSAPP_URL, CONTACT_EMAIL, SITE_NAME } from '@/lib/constants'

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function TripAdvisorIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 13.5c-2.761 0-5.2-1.4-6.676-3.538A5.985 5.985 0 0 1 9 14a5.97 5.97 0 0 1 3 .804A5.97 5.97 0 0 1 15 14c1.282 0 2.47.402 3.44 1.085C16.978 17.17 14.638 19 12 19z"/>
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#0F3D38', color: '#FAF7F2' }}>
      {/* Bande décorative top */}
      <div style={{ height: '2px', background: 'linear-gradient(to right, transparent, #C4902A, #CE8D5C, transparent)' }} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Top, logo + nav */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex flex-col gap-3 mb-5 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt=""
                style={{ width: '44px', height: '44px' }}
              />
              <div className="flex flex-col leading-none">
                <span
                  className="text-2xl tracking-tight"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 400, color: '#FAF7F2' }}
                >
                  Rendez-vous sur le Nil
                </span>
                <span className="text-[10px] tracking-[0.18em] uppercase font-medium mt-1" style={{ color: '#CE8D5C' }}>
                  Voyages premium en Égypte
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#8A9BAB' }}>
              Des expériences authentiques et haut de gamme en Égypte, imaginées et accompagnées par Sophie Godineau depuis Louxor.
            </p>
            {/* Réseaux */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/rendezvous_surlenil/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="footer-social-btn"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.facebook.com/p/Rendez-vous-sur-le-Nil-61553079940605/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="footer-social-btn"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.tripadvisor.fr/Attraction_Review-g294205-d32969157-Reviews-Rendez_vous_sur_le_Nil_La_Thebaide-Luxor_Nile_River_Valley.html"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TripAdvisor"
                className="footer-social-btn"
              >
                <TripAdvisorIcon />
              </a>
            </div>
          </div>

          {/* Nav colonnes */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h3
                className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-5"
                style={{ color: '#CE8D5C' }}
              >
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="footer-link text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #1E6860', marginBottom: '2rem' }} />

        {/* Partenaire assurance */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 py-5 px-6 rounded-sm" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1E6860' }}>
          <div className="flex items-center gap-4">
            <div
              className="flex-shrink-0 flex items-center justify-center px-3 py-1.5 rounded-sm"
              style={{ background: 'white' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/partners/chapka.webp"
                alt="Chapka Assurances"
                style={{ height: '28px', width: 'auto' }}
              />
            </div>
            <div>
              <p className="text-xs font-semibold" style={{ color: '#FAF7F2' }}>Assurance voyage recommandée</p>
              <p className="text-xs" style={{ color: '#8A9BAB' }}>Chapka Assurances — notre partenaire pour voyager sereinement en Égypte</p>
            </div>
          </div>
          <a
            href="https://www.chapkadirect.fr/index.php?action=produit&id=924"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex-shrink-0 text-xs font-medium px-4 py-2 rounded-sm transition-colors"
            style={{ background: 'rgba(196,144,42,0.15)', color: '#C4902A', border: '1px solid rgba(196,144,42,0.35)', whiteSpace: 'nowrap' }}
          >
            Obtenir un devis →
          </a>
        </div>

        {/* Contact rapide */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-6 text-sm" style={{ color: '#C5D5DF' }}>
            <a href={`mailto:${CONTACT_EMAIL}`} className="footer-contact-link flex items-center gap-2">
              <span>✉</span> {CONTACT_EMAIL}
            </a>
            <a href="tel:+33601315023" className="footer-contact-link flex items-center gap-2">
              <span>📞</span> +33 6 01 31 50 23
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-link flex items-center gap-2"
            >
              <span>📱</span> WhatsApp
            </a>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-guide-link text-xs"
          >
            Parlons de votre voyage →
          </a>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs" style={{ color: '#A8BBCA' }}>
          <p>© {year} {SITE_NAME}, Tous droits réservés</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="footer-link">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="footer-link">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>

      {/* Styles CSS injectés */}
      <style>{`
        .footer-link { color: #8A9BAB; transition: color 0.2s; }
        .footer-link:hover { color: #FAF7F2; }
        .footer-social-btn {
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid #1E6860; color: #8A9BAB;
          transition: border-color 0.2s, color 0.2s;
        }
        .footer-social-btn:hover { border-color: #C4902A; color: #C4902A; }
        .footer-contact-link { color: #C5D5DF; transition: color 0.2s; }
        .footer-contact-link:hover { color: #FAF7F2; }
        .footer-guide-link {
          color: #C4902A; border-bottom: 1px solid #C4902A;
          padding-bottom: 2px; letter-spacing: 0.06em;
          font-family: var(--font-manrope), system-ui, sans-serif;
          font-weight: 500; text-transform: uppercase; font-size: 0.6875rem;
          transition: opacity 0.2s;
        }
        .footer-guide-link:hover { opacity: 0.75; }
      `}</style>
    </footer>
  )
}
