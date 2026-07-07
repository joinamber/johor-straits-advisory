import { useState } from 'react'
import Reveal from './Reveal'

/*
 * Form delivery
 * -------------
 * Primary: Formspree. Create a free form at https://formspree.io, then replace
 * the placeholder ID below with your own (the string after /f/).
 * When left as the placeholder, the form automatically falls back to a mailto:
 * link so it works with zero configuration.
 */
const FORMSPREE_ID = 'your_form_id' // e.g. 'xda-abc123' — replace to enable Formspree
const CONTACT_EMAIL = 'amber@adptv.xyz'
const formspreeConfigured = FORMSPREE_ID && FORMSPREE_ID !== 'your_form_id'

const COUNTRIES = ['Singapore', 'Malaysia', 'China', 'United States', 'Other']
const SERVICES = [
  'Company Incorporation',
  'JS-SEZ Tax Incentives',
  'Cross-Border Structuring',
  'Corporate Compliance',
  'Employment & Work Passes',
  'Strategic Advisory',
  'Other',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClass =
  'w-full rounded-lg border border-mist bg-soft-white px-4 py-3 text-ink shadow-sm ' +
  'transition-colors focus:border-strait-teal focus:outline-none focus:ring-2 focus:ring-strait-teal/30 ' +
  'aria-[invalid=true]:border-red-500'

export default function Contact() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    service: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email.trim()) next.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(values.email)) next.email = 'Please enter a valid email address.'
    if (!values.message.trim()) next.message = 'Please tell us a little about your business.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const buildMailto = () => {
    const body = [
      `Full Name: ${values.name}`,
      `Email: ${values.email}`,
      `Company: ${values.company || '—'}`,
      `Country of Incorporation: ${values.country || '—'}`,
      `Service of Interest: ${values.service || '—'}`,
      '',
      'Message:',
      values.message,
    ].join('\n')
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      'New inquiry — Johor Straits Advisory'
    )}&body=${encodeURIComponent(body)}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')

    if (formspreeConfigured) {
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })
        if (res.ok) {
          setStatus('success')
          return
        }
      } catch {
        /* fall through to mailto */
      }
    }

    // Fallback: open the user's mail client with the inquiry pre-filled.
    window.location.href = buildMailto()
    setStatus('success')
  }

  return (
    <section id="contact" className="bg-warm-sand py-24 md:py-32">
      <div className="mx-auto max-w-content px-6">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="eyebrow mb-4">Get in Touch</p>
            <h2 className="font-display text-3xl leading-tight text-deep-navy sm:text-4xl md:text-5xl">
              Let&rsquo;s Start the Conversation
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink/80 sm:text-lg">
              Whether you&rsquo;re exploring Johor for the first time or ready to incorporate,
              we&rsquo;re here to help. Tell us about your business and we&rsquo;ll get back to you
              within one business day.
            </p>
          </Reveal>

          {status === 'success' ? (
            <Reveal
              className="mt-10 rounded-lg border border-strait-teal/30 bg-soft-white p-8 text-center shadow-sm"
              role="status"
              aria-live="polite"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-strait-teal/10 text-strait-teal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <p className="font-display text-2xl text-deep-navy">Thank you.</p>
              <p className="mt-2 text-ink/75">
                We&rsquo;ve received your inquiry and will respond within one business day.
              </p>
            </Reveal>
          ) : (
            <Reveal
              as="form"
              onSubmit={handleSubmit}
              noValidate
              className="mt-10 grid gap-5"
              aria-label="Contact form"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" required error={errors.name} htmlFor="name">
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    className={inputClass}
                    value={values.name}
                    onChange={update('name')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    required
                  />
                </Field>

                <Field label="Email Address" required error={errors.email} htmlFor="email">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={inputClass}
                    value={values.email}
                    onChange={update('email')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    required
                  />
                </Field>
              </div>

              <Field label="Company Name" htmlFor="company">
                <input
                  id="company"
                  type="text"
                  autoComplete="organization"
                  className={inputClass}
                  value={values.company}
                  onChange={update('company')}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Country of Incorporation" htmlFor="country">
                  <select id="country" className={inputClass} value={values.country} onChange={update('country')}>
                    <option value="">Select…</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Service of Interest" htmlFor="service">
                  <select id="service" className={inputClass} value={values.service} onChange={update('service')}>
                    <option value="">Select…</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Message" required error={errors.message} htmlFor="message">
                <textarea
                  id="message"
                  rows={4}
                  className={inputClass}
                  value={values.message}
                  onChange={update('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  required
                />
              </Field>

              <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send Inquiry'}
              </button>
            </Reveal>
          )}

          <p className="mt-8 text-center text-sm text-ink/70 sm:text-left">
            Or reach us directly at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-strait-teal underline-offset-2 hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

/* Labelled field wrapper with inline error messaging */
function Field({ label, htmlFor, required, error, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block font-sans text-sm font-medium text-deep-navy">
        {label}
        {required && <span className="text-strait-teal" aria-hidden="true"> *</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
