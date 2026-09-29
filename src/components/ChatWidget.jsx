import { useEffect, useRef, useState } from 'react'
import { NODES, ROOT_ID } from '../chatFlow'

// Shared with Contact.jsx — same Formspree endpoint, leads are distinguished
// by the `source` and `intent` fields in the payload.
const FORMSPREE_ID = 'xwvdzrva'
const formspreeConfigured = FORMSPREE_ID && FORMSPREE_ID !== 'your_form_id'
const CONTACT_EMAIL = 'johorstraitsadvisory@gmail.com'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function firstMessagesFor(node) {
  return [{ sender: 'bot', text: node.text }]
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [nodeId, setNodeId] = useState(ROOT_ID)
  const [messages, setMessages] = useState(() => firstMessagesFor(NODES[ROOT_ID]))
  const [intent, setIntent] = useState('General inquiry')
  const [captureValues, setCaptureValues] = useState({ name: '', email: '', company: '', notes: '' })
  const [captureError, setCaptureError] = useState('')
  const [captureStatus, setCaptureStatus] = useState('idle') // idle | submitting | success
  const scrollRef = useRef(null)
  const panelRef = useRef(null)

  const node = NODES[nodeId]

  // Auto-scroll the transcript to the latest message.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, nodeId])

  // Auto-advance "info" nodes straight to their `next` node after showing the answer.
  useEffect(() => {
    if (node.type === 'info') {
      const timer = setTimeout(() => {
        if (node.intent) setIntent(node.intent)
        goTo(node.next)
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [nodeId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Close on Escape; lock body scroll on mobile full-screen panel while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const goTo = (id, appendBotMessage = true) => {
    setNodeId(id)
    if (appendBotMessage) {
      setMessages((prev) => [...prev, { sender: 'bot', text: NODES[id].text }])
    }
  }

  const selectOption = (option) => {
    setMessages((prev) => [...prev, { sender: 'user', text: option.label }])
    if (option.intent) setIntent(option.intent)
    goTo(option.next)
  }

  const restart = () => {
    setNodeId(ROOT_ID)
    setMessages(firstMessagesFor(NODES[ROOT_ID]))
    setIntent('General inquiry')
    setCaptureValues({ name: '', email: '', company: '', notes: '' })
    setCaptureError('')
    setCaptureStatus('idle')
  }

  const updateCapture = (field) => (e) => {
    setCaptureValues((v) => ({ ...v, [field]: e.target.value }))
    if (captureError) setCaptureError('')
  }

  const submitCapture = async (e) => {
    e.preventDefault()
    if (!captureValues.name.trim()) return setCaptureError('Please enter your name.')
    if (!captureValues.email.trim() || !EMAIL_RE.test(captureValues.email)) {
      return setCaptureError('Please enter a valid email address.')
    }

    setCaptureStatus('submitting')
    const payload = {
      source: 'chatbot',
      intent,
      name: captureValues.name,
      email: captureValues.email,
      company: captureValues.company,
      message: captureValues.notes || `(No additional notes — via chatbot, intent: ${intent})`,
    }

    if (formspreeConfigured) {
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          setCaptureStatus('success')
          goTo('end')
          return
        }
      } catch {
        /* fall through to mailto */
      }
    }

    const body = [
      `Source: Chatbot (${intent})`,
      `Name: ${captureValues.name}`,
      `Email: ${captureValues.email}`,
      `Company: ${captureValues.company || '—'}`,
      '',
      'Notes:',
      captureValues.notes || '(none)',
    ].join('\n')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      'New chatbot inquiry — Johor Straits Advisory'
    )}&body=${encodeURIComponent(body)}`
    setCaptureStatus('success')
    goTo('end')
  }

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={open}
        aria-controls="chat-panel"
        className={`fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-strait-teal text-soft-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-calm-sky hover:text-deep-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-strait-teal sm:bottom-6 sm:right-6 ${
          open ? 'hidden sm:flex' : ''
        }`}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          id="chat-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Johor Straits Advisory assistant"
          className="fixed inset-0 z-50 flex flex-col bg-soft-white sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[34rem] sm:w-96 sm:rounded-lg sm:shadow-2xl sm:border sm:border-mist/40"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-deep-navy px-5 py-4 text-soft-white sm:rounded-t-lg">
            <div>
              <p className="font-display text-lg leading-none">Johor Straits Advisory</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-calm-sky">Assistant</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat assistant"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-mist hover:text-soft-white sm:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          {/* Transcript */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-strait-teal text-soft-white'
                      : 'bg-warm-sand text-ink'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive area — depends on current node type */}
          <div className="border-t border-mist/40 px-4 py-4">
            {node.type === 'menu' && (
              <div className="flex flex-col gap-2">
                {node.options.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => selectOption(option)}
                    className="rounded-lg border border-strait-teal/40 px-4 py-2.5 text-left text-sm font-medium text-strait-teal transition-colors hover:bg-strait-teal hover:text-soft-white"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {node.type === 'info' && (
              <p className="text-center text-xs text-ink/50">One moment…</p>
            )}

            {node.type === 'capture' && (
              <form onSubmit={submitCapture} className="flex flex-col gap-3" aria-label="Contact capture form">
                <input
                  type="text"
                  placeholder="Your name"
                  aria-label="Your name"
                  value={captureValues.name}
                  onChange={updateCapture('name')}
                  autoComplete="name"
                  className="w-full rounded-lg border border-mist bg-soft-white px-3 py-2.5 text-sm text-ink focus:border-strait-teal focus:outline-none focus:ring-2 focus:ring-strait-teal/30"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  aria-label="Email address"
                  value={captureValues.email}
                  onChange={updateCapture('email')}
                  autoComplete="email"
                  className="w-full rounded-lg border border-mist bg-soft-white px-3 py-2.5 text-sm text-ink focus:border-strait-teal focus:outline-none focus:ring-2 focus:ring-strait-teal/30"
                />
                <input
                  type="text"
                  placeholder="Company (optional)"
                  aria-label="Company (optional)"
                  value={captureValues.company}
                  onChange={updateCapture('company')}
                  autoComplete="organization"
                  className="w-full rounded-lg border border-mist bg-soft-white px-3 py-2.5 text-sm text-ink focus:border-strait-teal focus:outline-none focus:ring-2 focus:ring-strait-teal/30"
                />
                <textarea
                  rows={2}
                  placeholder="Anything specific we should know? (optional)"
                  aria-label="Additional notes (optional)"
                  value={captureValues.notes}
                  onChange={updateCapture('notes')}
                  className="w-full rounded-lg border border-mist bg-soft-white px-3 py-2.5 text-sm text-ink focus:border-strait-teal focus:outline-none focus:ring-2 focus:ring-strait-teal/30"
                />
                {captureError && (
                  <p className="text-sm text-red-600" role="alert">{captureError}</p>
                )}
                <button
                  type="submit"
                  disabled={captureStatus === 'submitting'}
                  className="btn-primary w-full"
                >
                  {captureStatus === 'submitting' ? 'Sending…' : 'Send'}
                </button>
              </form>
            )}

            {node.type === 'end' && (
              <button type="button" onClick={restart} className="btn-secondary w-full">
                Start over
              </button>
            )}

            {node.type !== 'end' && (
              <button
                type="button"
                onClick={restart}
                className="mt-3 w-full text-center text-xs text-ink/50 underline-offset-2 hover:text-strait-teal hover:underline"
              >
                Start over
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
