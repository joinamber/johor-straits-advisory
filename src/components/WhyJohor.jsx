import Reveal from './Reveal'

const POINTS = [
  {
    title: 'Cost Advantage',
    body: 'Office rent 5–10x cheaper. Labour costs 50–70% lower. Utilities 30–40% less. The economics are structural, not temporary.',
  },
  {
    title: 'RTS Link (December 2026)',
    body: 'A 4 km cross-border rail connecting JB and Singapore in 5 minutes. 10,000 passengers per hour. This changes the commuting equation permanently.',
  },
  {
    title: '100% Foreign Ownership',
    body: 'Most services sectors allow full foreign ownership. Your Singapore Pte Ltd can hold 100% of a Malaysian Sdn Bhd.',
  },
  {
    title: 'Dual-Market Access',
    body: 'Operate from Johor, serve Singapore and ASEAN. 700 million people in one of the world’s fastest-growing regions.',
  },
  {
    title: 'Government Facilitation',
    body: 'IMFC-J one-stop centre, MIDA fast-track approvals, and a JS-SEZ Project Office on the Singapore side through EDB.',
  },
]

export default function WhyJohor() {
  return (
    <section id="why-johor" className="bg-soft-white py-24 md:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="eyebrow mb-4">Why Johor</p>
          <h2 className="max-w-3xl font-display text-3xl leading-tight text-deep-navy sm:text-4xl md:text-5xl">
            Where Singapore&rsquo;s Ambition Meets Johor&rsquo;s Opportunity
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-mist/50 border-y border-mist/50">
          {POINTS.map((point) => (
            <Reveal
              key={point.title}
              className="grid gap-3 py-8 md:grid-cols-[minmax(0,1fr)_2fr] md:gap-10"
            >
              <h3 className="font-display text-2xl text-strait-teal">{point.title}</h3>
              <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{point.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
