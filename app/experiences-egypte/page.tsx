import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/constants'

export const metadata: Metadata = {
  title: "Expériences rares en Égypte, Désert blanc, oasis & nuits étoilées",
  description:
    "Désert blanc, bivouac sous les étoiles, oasis de Siwa, l'Égypte profonde, loin des circuits de masse. Avec Sophie & Nasser.",
  alternates: { canonical: 'https://rendezvous-surlenil.com/experiences-egypte' },
  openGraph: {
    title: "L'Égypte que peu de voyageurs voient, Rendez-vous sur le Nil",
    description: "Désert blanc, nuits étoilées, oasis berbères, l'Égypte profonde, loin des bus et des guides à fanion.",
    images: [{ url: 'https://images.unsplash.com/photo-1539768942893-daf853948e5e?w=1200&q=85', width: 1200, height: 630, alt: "Expériences rares en Égypte, désert blanc, oasis et nuits étoilées" }],
  },
}

const whatsappUrl = getWhatsAppUrl(
  'Bonjour Sophie, je souhaite organiser un voyage en Égypte.'
)

const experiences = [
  {
    id: 'desert-blanc',
    eyebrow: 'Farafra · Oasis de Bahariya',
    title: 'Le désert blanc',
    subtitle: 'Comme une autre planète.',
    image: '/photos/escapades/tunnel-craie.jpg',
    body: [
      'À six heures de route du Caire, le paysage bascule. La terre devient poudre, puis craie, puis sculpture. Des formations calcaires taillées par des millénaires de vent surgissent du sol comme des champignons géants, comme des vagues figées, comme des présences.',
      'Le désert blanc de Farafra est classé au patrimoine naturel égyptien, et c\'est encore l\'un des secrets les mieux gardés du pays. Peu de voyageurs s\'y aventurent. La logistique rebute. Les agences classiques n\'y proposent rien.',
      'Avec Nasser, qui connaît ce terrain depuis son enfance, vous y allez autrement.',
    ],
    details: [
      'Départ en 4x4 depuis l\'oasis de Bahariya',
      'Bivouac dans les formations calcaires',
      'Sources d\'eau chaude de Bir Sigam',
      'Coucher de soleil qui réchauffe la roche',
      'Silence complet, aucune lumière artificielle à l\'horizon',
    ],
    link: '/sejours/escapades-serenite',
    linkLabel: 'Voir l\'Escapade Désert',
  },
  {
    id: 'nuit-etoiles',
    eyebrow: 'Désert occidental · Altitude 200m',
    title: 'Une nuit dans l\'obscurité totale',
    subtitle: 'Les étoiles comme vous ne les avez jamais vues.',
    image: '/photos/voyageurs/guide-feu-desert.jpg',
    body: [
      'Il n\'y a pas de pollution lumineuse dans le désert égyptien. Aucune. À 200 kilomètres de la première ville, les étoiles ne scintillent pas, elles s\'imposent. La Voie lactée est une route qu\'on aurait envie d\'emprunter.',
      'Dormir à la belle étoile dans le désert n\'est pas une aventure d\'explorateur. C\'est une expérience contemplative. Un matelas au sol, un thé chaud préparé sur un réchaud, et Nasser qui nomme les constellations en arabe et en français.',
      'Vous vous endormez sous le ciel. Vous vous réveillez au silence. Il n\'y a rien de plus simple. Et rien de plus impossible à reproduire en rentrant.',
    ],
    details: [
      'Matelas, couvertures et tentes si besoin',
      'Dîner préparé au feu sur place',
      'Guide local passionné d\'astronomie, présent sur place',
      'Température idéale : octobre à mars',
      'Option : réveil à l\'aube pour le lever de soleil',
    ],
    link: '/sejours/escapades-serenite',
    linkLabel: 'Voir les Escapades',
  },
  {
    id: 'oasis-slow',
    eyebrow: 'Siwa · Dakhla · Fayoum',
    title: 'Oasis & slow travel',
    subtitle: 'L\'Égypte qui n\'a pas changé.',
    image: '/photos/privileges/siwa-lac-turquoise.jpg',
    body: [
      'Les oasis égyptiennes sont des mondes à part. Des bulles de verdure et d\'eau au milieu du désert, habitées depuis des millénaires par des populations berbères, nubiennes, arabes, chacune avec sa langue, son architecture, ses traditions.',
      'Siwa est la plus connue, et pourtant la plus préservée. À la frontière libyenne, isolée par des centaines de kilomètres de sable, elle n\'a été reliée à une route asphaltée qu\'en 1984. On y parle le siwi, un dialecte berbère. On y bâtit encore en kershef, cette argile salée mélangée à des tiges de palmier.',
      'Le slow travel ici ne s\'explique pas. Il se vit. Vélo dans les palmeraies, baignade dans les sources chaudes, thé à la menthe sur les toits plats, coucher de soleil depuis la montagne des Morts. On n\'est pressé par rien.',
    ],
    details: [
      'Siwa : 3 à 5 nuits recommandées',
      'Dakhla : la plus "verte" des oasis',
      'Fayoum : lac Qarun et réserve naturelle',
      'Logements locaux authentiques sélectionnés par Sophie',
      'Combinaisons Nil + oasis possibles',
    ],
    link: '/sur-mesure',
    linkLabel: 'Construire ce voyage',
  },
]

export default function ExperiencesEgyptePage() {
  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '92vh' }}>
        <div className="absolute inset-0">
          <Image
            src="/photos/voyageurs/feu-camp-coucher.jpg"
            alt="Feu de camp au coucher de soleil dans le désert égyptien"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.62)', objectPosition: 'center 45%' }}
          />
          {/* Gradient profond */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(13,33,55,0.05) 0%, rgba(13,33,55,0.04) 30%, rgba(13,33,55,0.65) 72%, rgba(13,33,55,0.96) 100%)',
            }}
          />
          {/* Grain */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
        </div>

        {/* Breadcrumb */}
        <nav
          className="absolute top-28 left-6 md:left-16 flex items-center gap-2 text-xs z-10"
          style={{ color: 'rgba(255,255,255,0.5)' }}
          aria-label="Fil d'Ariane"
        >
          <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
          <span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.85)' }}>Expériences</span>
        </nav>

        <div
          className="relative z-10 flex flex-col justify-end px-6 md:px-16 pb-20 md:pb-32 max-w-[1200px] mx-auto"
          style={{ minHeight: '92vh' }}
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: '32px', height: '1px', background: '#C4902A' }} />
              <p className="eyebrow" style={{ color: '#CE8D5C' }}>Hors des circuits de masse</p>
            </div>
            <h1
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2.5rem, 6vw, 4.75rem)',
                color: 'white',
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
              }}
            >
              L&apos;Égypte que peu
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#CE8D5C' }}>de voyageurs voient.</em>
            </h1>
            <p
              className="text-lg mb-12"
              style={{ color: 'rgba(250,247,242,0.78)', maxWidth: '520px', fontWeight: 300, lineHeight: 1.75 }}
            >
              Ni pyramides bondées ni bateaux à 400 passagers. Le désert blanc, les nuits sous les étoiles du Sahara,
              les oasis berbères à la frontière libyenne, l&apos;Égypte lente, rare, qui laisse des traces.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              Parlons de votre voyage →
            </a>
          </div>
        </div>
      </section>

      {/* ─── Introduction ──────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#0F3D38' }}>
        <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
          <p className="eyebrow mb-6" style={{ color: '#C4902A' }}>Pourquoi ces expériences</p>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: '#FAF7F2',
              fontWeight: 400,
              lineHeight: 1.2,
              marginBottom: '2.5rem',
            }}
          >
            L&apos;Égypte n&apos;est pas seulement
            <br />
            <em style={{ fontStyle: 'italic', color: '#CE8D5C', fontWeight: 300 }}>ses temples et son Nil.</em>
          </h2>
          <div className="space-y-5 text-left max-w-xl mx-auto">
            <p className="leading-relaxed" style={{ color: 'rgba(250,247,242,0.72)', fontSize: '1.0625rem', lineHeight: 1.85 }}>
              La plupart des voyageurs qui viennent en Égypte suivent le même itinéraire, Le Caire, les Pyramides, une croisière en grand bateau, Assouan. C&apos;est beau. Mais c&apos;est l&apos;Égypte des foules.
            </p>
            <p className="leading-relaxed" style={{ color: 'rgba(250,247,242,0.72)', fontSize: '1.0625rem', lineHeight: 1.85 }}>
              Il y a une autre Égypte. Celle du désert occidental, des oasis oubliées, des nuits sans bruit ni lumière. Une Égypte qui demande du temps, de la curiosité, et quelqu&apos;un pour l&apos;ouvrir.
            </p>
            <p className="leading-relaxed" style={{ color: 'rgba(250,247,242,0.72)', fontSize: '1.0625rem', lineHeight: 1.85 }}>
              C&apos;est ce que Sophie et Nasser construisent, tisser ces deux Égyptes ensemble, pour des voyageurs qui veulent vraiment voir.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Les 3 expériences ─────────────────────────────── */}
      <section className="py-4" style={{ background: '#FAF7F2' }}>
        {experiences.map((exp, i) => (
          <article
            key={exp.id}
            id={exp.id}
            className="py-20 md:py-28"
            style={{
              background: i % 2 === 0 ? '#FAF7F2' : '#FDF8F0',
              borderTop: i > 0 ? '1px solid #E8D5B7' : 'none',
            }}
          >
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                {/* Image */}
                <div className="relative">
                  <div className="img-portrait-lg overflow-hidden rounded-sm">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  {/* Badge numéro */}
                  <div
                    className="absolute -bottom-4 -right-4 w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: '#0F3D38', border: '2px solid #C4902A' }}
                    aria-hidden="true"
                  >
                    <span style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.25rem', color: '#C4902A', fontWeight: 300 }}>
                      0{i + 1}
                    </span>
                  </div>
                </div>

                {/* Texte */}
                <div>
                  <p className="eyebrow mb-3">{exp.eyebrow}</p>
                  <h2
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                      color: '#0F3D38',
                      fontWeight: 400,
                      lineHeight: 1.15,
                      marginBottom: '0.35rem',
                    }}
                  >
                    {exp.title}
                  </h2>
                  <p
                    className="mb-8 italic"
                    style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.25rem', color: '#C4902A', fontWeight: 300 }}
                  >
                    {exp.subtitle}
                  </p>

                  {/* Paragraphes */}
                  <div className="space-y-4 mb-8">
                    {exp.body.map((para, j) => (
                      <p key={j} className="leading-relaxed text-sm" style={{ color: '#3D5166', lineHeight: 1.85 }}>
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Détails */}
                  <div
                    className="p-5 rounded-sm mb-8"
                    style={{ background: '#FDF8F0', border: '1px solid #E8D5B7' }}
                  >
                    <ul className="flex flex-col gap-2.5">
                      {exp.details.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-sm" style={{ color: '#5C6E7E' }}>
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#C4902A' }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                      Parlons de votre voyage →
                    </a>
                    <Link
                      href={exp.link}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase self-center"
                      style={{ color: '#C4902A' }}
                    >
                      {exp.linkLabel} <ArrowRight size={12} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ─── Pourquoi différent ────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#0F3D38' }} aria-labelledby="diff-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>Ce qui nous distingue</p>
            <h2
              id="diff-heading"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                color: '#FAF7F2',
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              Pas un tour-opérateur.
              <br />
              <em style={{ fontStyle: 'italic', color: '#CE8D5C', fontWeight: 300 }}>Une porte d&apos;entrée.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Nasser connaît le terrain',
                body: 'Il a grandi en Égypte, à Louxor. Il connaît les guides de désert de Siwa depuis 20 ans, les propriétaires d\'écolodges à Dakhla, les pistes non cartographiées. Ce réseau ne s\'achète pas.',
              },
              {
                num: '02',
                title: 'Pas de groupe',
                body: 'Ces expériences ne s\'organisent pas avec d\'autres voyageurs que vous ne connaissez pas. Vous êtes seuls, ou avec les gens que vous avez choisis.',
              },
              {
                num: '03',
                title: 'Le bon rythme',
                body: 'Le slow travel n\'est pas une posture marketing. C\'est une façon concrète de construire un itinéraire, sans cases à cocher, sans course contre la montre.',
              },
              {
                num: '04',
                title: 'Intégré à votre voyage',
                body: 'Ces expériences se combinent naturellement avec une croisière dahabiya ou un séjour à Louxor. Sophie construit l\'ensemble pour que ça se tienne.',
              },
              {
                num: '05',
                title: 'Sécurisé sans être aseptisé',
                body: 'Nasser assure la logistique sur le terrain. Vous dormez dans le désert en toute sécurité, pas dans un camp touristique avec 50 autres personnes.',
              },
              {
                num: '06',
                title: 'Un vrai souvenir',
                body: 'Dans 10 ans, vous vous souviendrez de cette nuit dans le désert blanc. Pas du musée égyptien avec 400 autres visiteurs.',
              },
            ].map(({ num, title, body }) => (
              <div
                key={num}
                className="p-6 rounded-sm"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,169,110,0.15)' }}
              >
                <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '2rem', color: 'rgba(201,169,110,0.3)', fontWeight: 300, lineHeight: 1, marginBottom: '1rem' }}>
                  {num}
                </p>
                <h3 className="mb-2 font-medium" style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.125rem', color: '#FAF7F2' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8A9BAB', lineHeight: 1.8 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Intégration Nil + Désert ──────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#FDF8F0' }} aria-labelledby="combo-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="eyebrow mb-4">Le voyage complet</p>
              <h2
                id="combo-heading"
                className="title-underline mb-8"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  color: '#0F3D38',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                Le Nil et le désert.
                <br />
                <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Deux Égyptes, un voyage.</em>
              </h2>
              <p className="leading-relaxed mb-5" style={{ color: '#5C6E7E', fontSize: '1.0625rem', lineHeight: 1.85 }}>
                Les voyageurs qui reviennent en Égypte disent tous la même chose : la première fois, ils ont fait les pyramides et le Nil. La deuxième fois, ils ont voulu autre chose.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: '#5C6E7E', fontSize: '1.0625rem', lineHeight: 1.85 }}>
                Avec Sophie, pas besoin d&apos;attendre la deuxième fois. Elle construit des voyages qui combinent une croisière dahabiya sur le Nil, quelques nuits à La Thébaïde à Louxor, et une extension désert à Siwa ou dans le désert blanc. Deux Égyptes dans le même voyage, l&apos;eau et le sable.
              </p>

              <div className="flex flex-col gap-3 mb-8">
                {[
                  { label: 'Dahabiya → Louxor → Désert blanc', duration: '14 nuits' },
                  { label: 'Le Caire → Siwa → Louxor → Assouan', duration: '12 nuits' },
                  { label: 'Circuit des oasis + croisière courte', duration: '10 nuits' },
                ].map(({ label, duration }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between p-4 rounded-sm"
                    style={{ background: 'white', border: '1px solid #E8D5B7' }}
                  >
                    <span className="text-sm" style={{ color: '#0F3D38' }}>{label}</span>
                    <span className="text-xs font-medium" style={{ color: '#8A9BAB' }}>{duration}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm italic mb-6" style={{ color: '#8A9BAB' }}>
                Ces itinéraires sont des exemples, Sophie les adapte à vos dates et vos envies.
              </p>

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                Parlons de votre voyage →
              </a>
            </div>

            {/* Grid 2 images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="img-portrait overflow-hidden rounded-sm">
                <Image
                  src="/photos/dahabiya/salon-coucher.jpg"
                  alt="Salon de la dahabiya au coucher de soleil sur le Nil"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="img-square overflow-hidden rounded-sm flex-1">
                  <Image
                    src="/photos/escapades/cuisine-feu-desert-blanc.jpg"
                    alt="Cuisine au feu dans le désert blanc"
                    fill
                    sizes="15vw"
                    className="object-cover"
                  />
                </div>
                <div className="img-square overflow-hidden rounded-sm flex-1">
                  <Image
                    src="/photos/voyageurs/femme-flottant-siwa.jpg"
                    alt="Voyageuse flottant dans le lac turquoise de Siwa"
                    fill
                    sizes="15vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA final ─────────────────────────────────────── */}
      <section className="py-20 md:py-28 text-center" style={{ background: '#0F3D38' }}>
        <div className="max-w-xl mx-auto px-6">
          <p className="eyebrow mb-4" style={{ color: '#C4902A' }}>Vous sentez l&apos;appel ?</p>
          <h2
            className="text-display-lg mb-6"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#FAF7F2', fontWeight: 400 }}
          >
            On parle de ce que vous
            <br />
            <em style={{ fontStyle: 'italic', color: '#CE8D5C' }}>n&apos;avez pas encore vu.</em>
          </h2>
          <p className="mb-10 text-sm leading-relaxed" style={{ color: '#8A9BAB' }}>
            Envoyez un message à Sophie. Décrivez ce qui vous attire, le désert, le silence, l&apos;inconnu.
            Elle vous dira exactement comment on peut aller là-bas ensemble.
          </p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }} aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Parlons de votre voyage →
          </a>
        </div>
      </section>
    </>
  )
}
