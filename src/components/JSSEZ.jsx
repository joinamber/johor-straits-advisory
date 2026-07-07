import Reveal from './Reveal'

const INCENTIVES = [
  {
    rate: '5%',
    title: 'Corporate Tax',
    body: 'Up to 15 years, vs. Malaysia’s standard 24%. For qualifying activities in manufacturing, digital economy, financial services, logistics, and more.',
  },
  {
    rate: '15%',
    title: 'Knowledge Worker Tax',
    body: 'Flat rate for up to 10 years, vs. progressive rates up to 30%. For professionals earning ≥RM 20,000/month in qualifying sectors.',
  },
  {
    rate: '0%',
    title: 'Family Office Rate',
    body: 'Forest City Special Financial Zone: 0% for qualifying Single Family Office Vehicles for up to 20 years.',
  },
  {
    rate: '100%',
    title: 'Investment Tax Allowance',
    body: 'For existing companies undertaking new qualifying investment — 100% ITA on capex within 5 years.',
  },
]

export default function JSSEZ() {
  return (
    <section id="js-sez" className="bg-deep-navy py-24 text-soft-white md:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="eyebrow mb-4 text-calm-sky">JS-SEZ Incentives</p>
          <h2 className="max-w-3xl font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
            The Johor-Singapore Special Economic Zone, Explained
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-mist sm:text-lg">
            The JS-SEZ is a bilateral cross-border economic zone spanning ~3,588 km² across
            southern Johor, formally established January 2025. It offers qualifying businesses a
            corporate tax rate of 5% for up to 15 years, a 15% flat personal income tax for
            knowledge workers, and a suite of fiscal incentives across 11 priority sectors and 9
            flagship zones.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {INCENTIVES.map((item, i) => (
            <Reveal
              key={item.title}
              as="article"
              style={{ transitionDelay: `${(i % 2) * 80}ms` }}
              className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-4xl font-bold text-calm-sky sm:text-5xl">
                  {item.rate}
                </span>
                <span className="font-display text-xl text-soft-white">{item.title}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-mist sm:text-base">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <a href="#contact" className="btn-primary">
            See if your business qualifies
          </a>
        </Reveal>
      </div>
    </section>
  )
}
