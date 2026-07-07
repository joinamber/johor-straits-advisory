const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'JS-SEZ', href: '#js-sez' },
  { label: 'Why Johor', href: '#why-johor' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-deep-navy text-mist">
      <div className="mx-auto max-w-content px-6 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-sm">
            © 2026 Johor Straits Advisory. All rights reserved.
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-mist transition-colors hover:text-calm-sky"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-8 max-w-3xl border-t border-white/10 pt-6 text-xs leading-relaxed text-mist/70">
          Johor Straits Advisory provides general corporate advisory services. This website does
          not constitute legal, tax, or investment advice.
        </p>
      </div>
    </footer>
  )
}
