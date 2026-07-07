import Reveal from './Reveal'

/* Simple, consistent SVG line icons (stroke = currentColor) */
const Icon = ({ path }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {path}
  </svg>
)

const SERVICES = [
  {
    title: 'Company Incorporation',
    body: 'Sdn Bhd setup, SSM registration, resident director arrangements, and entity structuring for foreign-owned businesses in Malaysia.',
    icon: <Icon path={<><rect x="3" y="8" width="18" height="12" rx="1" /><path d="M8 8V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3M12 12v4M9 14h6" /></>} />,
  },
  {
    title: 'JS-SEZ Tax Incentives',
    body: 'Eligibility assessment, MIDA application support, and incentive structuring to access the 5% corporate tax rate for up to 15 years.',
    icon: <Icon path={<><path d="M6 3h9l3 3v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M9 12l2 2 4-4" /></>} />,
  },
  {
    title: 'Cross-Border Structuring',
    body: 'SG parent / JB subsidiary design, transfer pricing compliance across IRAS and LHDN, and dual-market operating models.',
    icon: <Icon path={<><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8.5 6H15a3 3 0 0 1 3 3v6M6 8.5V15a3 3 0 0 0 3 3h6.5" /></>} />,
  },
  {
    title: 'Corporate Compliance',
    body: 'Company secretary services, annual returns, audited accounts, and ongoing SSM/LHDN filings to keep your Malaysian entity in good standing.',
    icon: <Icon path={<><path d="M9 3h6l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M8 11h8M8 15h8M8 7h3" /></>} />,
  },
  {
    title: 'Employment & Work Passes',
    body: 'Employment Act guidance, EPF/SOCSO/EIS registration, Employment Pass applications, and knowledge worker tax optimization.',
    icon: <Icon path={<><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></>} />,
  },
  {
    title: 'Strategic Advisory',
    body: 'Market entry assessment, flagship zone selection, cost-of-operations modelling, and investor facilitation through IMFC-J and InvestJohor.',
    icon: <Icon path={<><path d="M3 20h18M6 20v-6M11 20V8M16 20v-9M20.5 5.5 16 11l-3-2-4 4" /></>} />,
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-warm-sand py-24 md:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="eyebrow mb-4">Our Services</p>
          <h2 className="max-w-3xl font-display text-3xl leading-tight text-deep-navy sm:text-4xl md:text-5xl">
            From First Inquiry to Fully Operational
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal
              key={service.title}
              as="article"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              className="group rounded-lg border border-mist/40 bg-soft-white p-7 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-strait-teal/10 text-strait-teal transition-colors group-hover:bg-strait-teal group-hover:text-soft-white">
                {service.icon}
              </div>
              <h3 className="font-display text-xl text-deep-navy">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/75 sm:text-base">{service.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
