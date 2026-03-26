import { MapPin, Heart, Star, Clock, Users } from 'lucide-react'

const items = [
  { icon: MapPin,  text: 'Résidente à Louxor depuis +10 ans' },
  { icon: Heart,   text: 'Aucun groupe imposé' },
  { icon: Star,    text: 'Dahabiya privatisée pour vous seuls' },
  { icon: Clock,   text: 'Réponse sous 24h' },
  { icon: Users,   text: '+100 voyageurs ravis' },
]

const doubled = [...items, ...items]

export default function ReassuranceBar() {
  return (
    <section
      aria-label="Nos engagements"
      style={{ background: '#2A5A54', borderBottom: '1px solid #1E6860' }}
    >
      <div className="py-3.5 marquee-viewport">
        <div className="marquee-track" aria-hidden="true">
          {doubled.map(({ icon: Icon, text }, i) => (
            <div
              key={`${text}-${i}`}
              className="flex items-center gap-2.5 px-8"
              style={{ flexShrink: 0 }}
            >
              <Icon size={13} style={{ color: '#C4902A', flexShrink: 0 }} aria-hidden="true" />
              <span
                className="text-xs font-medium whitespace-nowrap"
                style={{ color: 'rgba(250,247,242,0.8)', letterSpacing: '0.06em' }}
              >
                {text}
              </span>
              <span
                className="ml-6"
                style={{ display: 'block', width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(201,169,110,0.4)', flexShrink: 0 }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
