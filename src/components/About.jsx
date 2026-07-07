import Reveal from './Reveal'

const STATS = [
  { value: '4', label: 'Jurisdictions' },
  { value: '10+', label: 'Years Experience' },
  { value: 'End-to-End', label: 'Advisory' },
]

export default function About() {
  return (
    <section id="about" className="bg-soft-white py-24 md:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="eyebrow mb-4">About Us</p>
          <h2 className="max-w-3xl font-display text-3xl leading-tight text-deep-navy sm:text-4xl md:text-5xl">
            Navigating the Strait Between Opportunity and Compliance
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="space-y-5 text-base leading-relaxed text-ink/80 sm:text-lg">
            <p>
              Johor Straits Advisory is a specialist corporate services firm guiding
              Singapore-based companies and entrepreneurs through every step of establishing
              and operating in Johor Bahru.
            </p>
            <p>
              Founded by professionals with deep expertise across Singapore, Malaysia, the US,
              and China — spanning incorporation, governance, annual compliance, corporate tax,
              and cross-border structuring.
            </p>
            <p>
              We combine regulatory precision with commercial pragmatism, so you can focus on
              growth while we handle the complexity.
            </p>
          </Reveal>

          <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-mist/50 bg-warm-sand p-6 shadow-sm"
              >
                <div className="font-mono text-3xl font-bold text-strait-teal">{stat.value}</div>
                <div className="mt-2 font-display text-lg text-deep-navy">{stat.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
