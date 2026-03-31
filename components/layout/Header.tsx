'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { NAV_LINKS, EXPERIENCES_SUBMENU, WHATSAPP_URL } from '@/lib/constants'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [experiencesOpen, setExperiencesOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setExperiencesOpen(false)
  }, [pathname])

  // Fermer le dropdown si clic extérieur
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setExperiencesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8D5B7] shadow-sm'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Rendez-vous sur le Nil, Accueil">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt=""
              width={40}
              height={40}
              style={{ width: '44px', height: '44px', flexShrink: 0 }}
            />
            <div className="flex flex-col leading-none">
              <span
                className="font-display text-xl tracking-tight"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  color: scrolled || mobileOpen ? '#0F3D38' : 'white',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                }}
              >
                Rendez-vous sur le Nil
              </span>
              <span
                className="hidden md:block text-[10px] tracking-[0.18em] uppercase font-medium mt-0.5"
                style={{ color: '#CE8D5C' }}
              >
                Voyages en Égypte
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => {
              if (link.href === '/experiences-egypte') {
                return (
                  <div key={link.href} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setExperiencesOpen((v) => !v)}
                      className={[
                        'flex items-center gap-1 text-[13px] font-medium tracking-wide transition-colors duration-200',
                        scrolled ? 'text-[#0F3D38]' : 'text-white/90',
                        isActive('/sejours') ? 'text-[#9B6048]' : 'hover:text-[#CE8D5C]',
                      ].join(' ')}
                      aria-expanded={experiencesOpen}
                    >
                      Séjours
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${experiencesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {experiencesOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 bg-[#FAF7F2] border border-[#E8D5B7] rounded-sm shadow-lg overflow-hidden">
                        <div className="py-1">
                          <Link
                            href="/experiences-egypte"
                            className="block px-5 py-3 text-sm text-[#0F3D38] hover:bg-[#F5ECD7] border-b border-[#E8D5B7]"
                          >
                            <span className="font-medium">Toutes nos expériences</span>
                          </Link>
                          {EXPERIENCES_SUBMENU.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block px-5 py-3 text-sm hover:bg-[#F5ECD7] group"
                            >
                              <span className="text-[#0F3D38] font-medium group-hover:text-[#C4902A] transition-colors">
                                {item.label}
                              </span>
                              <span className="block text-xs text-[#5C6E7E] mt-0.5">{item.description}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    'text-[13px] font-medium tracking-wide transition-colors duration-200',
                    scrolled ? 'text-[#0F3D38]' : 'text-white/90',
                    isActive(link.href) ? 'text-[#9B6048]' : 'hover:text-[#CE8D5C]',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* CTA desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-xs"
              style={{ paddingTop: '10px', paddingBottom: '10px' }}
            >
              Parlons de votre voyage →
            </a>
          </div>

          {/* Hamburger mobile */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 -mr-2 rounded-sm transition-colors"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={22} color="#0F3D38" />
            ) : (
              <Menu size={22} color={scrolled ? '#0F3D38' : 'white'} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={[
          'fixed inset-0 z-40 lg:hidden transition-all duration-300',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#0F3D38]/60 transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          className={[
            'absolute top-0 right-0 h-full w-[min(320px,90vw)] bg-[#FAF7F2] shadow-2xl transition-transform duration-300 flex flex-col',
            mobileOpen ? 'translate-x-0' : 'translate-x-full',
          ].join(' ')}
        >
          {/* Header panel */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-[#E8D5B7]">
            <span className="font-display text-lg" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#0F3D38' }}>
              Menu
            </span>
            <button onClick={() => setMobileOpen(false)} className="p-2 -mr-2" aria-label="Fermer">
              <X size={20} color="#0F3D38" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 overflow-y-auto py-4" aria-label="Navigation mobile">
            {NAV_LINKS.map((link) => {
              if (link.href === '/experiences-egypte') {
                return (
                  <div key={link.href}>
                    <Link
                      href="/experiences-egypte"
                      className="block px-6 py-4 text-[#0F3D38] font-medium border-b border-[#E8D5B7]/50 text-[15px]"
                    >
                      Expériences
                    </Link>
                    {EXPERIENCES_SUBMENU.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-10 py-3 text-sm text-[#5C6E7E] hover:text-[#C4902A] border-b border-[#E8D5B7]/30"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    'block px-6 py-4 font-medium border-b border-[#E8D5B7]/50 text-[15px] transition-colors',
                    isActive(link.href) ? 'text-[#C4902A]' : 'text-[#0F3D38] hover:text-[#C4902A]',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* CTAs mobiles */}
          <div className="p-6 flex flex-col gap-3 border-t border-[#E8D5B7]">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-center justify-center w-full"
            >
              Parlons de votre voyage →
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-center justify-center w-full"
            >
              Écrire sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
