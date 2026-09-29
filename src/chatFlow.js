/*
 * Rule-based conversational flow for the site chatbot.
 * A plain decision tree — no LLM, no network calls until the final lead
 * submission. Each node is one of:
 *   - "menu":    bot asks a question, user picks one of several options
 *   - "info":    bot gives a canned answer, then auto-advances to `next`
 *   - "capture": lead-capture form (name/email/company/notes) -> Formspree
 *   - "end":     closing message with a restart action
 *
 * Reviewed and approved flow — see conversation history for the design.
 */

export const ROOT_ID = 'root'

export const NODES = {
  root: {
    type: 'menu',
    text: "Hi! I'm here to help you find the right starting point. What brings you to Johor Straits Advisory today?",
    options: [
      { label: '🏢 Moving my business to Johor', next: 'moving_stage' },
      { label: '💰 Understanding JS-SEZ tax incentives', next: 'sez_menu' },
      { label: '📋 Incorporation / compliance help', next: 'incorp_menu' },
      { label: "👤 I'd rather just talk to someone", next: 'capture', intent: 'General inquiry' },
    ],
  },

  moving_stage: {
    type: 'menu',
    text: 'Great — what stage are you at?',
    options: [
      { label: 'Just researching', next: 'moving_researching' },
      { label: 'Ready to incorporate', next: 'capture', intent: 'Company Incorporation' },
      { label: 'Already operating, restructuring', next: 'capture', intent: 'Cross-Border Structuring' },
    ],
  },
  moving_researching: {
    type: 'info',
    text: "Here's the short version: office rent is 5–10x cheaper, labour costs 50–70% lower, and the new RTS Link (Dec 2026) connects JB and Singapore in just 5 minutes. Most services sectors also allow 100% foreign ownership.",
    next: 'soft_ask',
    intent: 'Why Johor',
  },

  sez_menu: {
    type: 'menu',
    text: 'Which incentive is most relevant to you?',
    options: [
      { label: '5% corporate tax', next: 'sez_corp_tax' },
      { label: '15% knowledge worker tax', next: 'sez_worker_tax' },
      { label: 'Not sure — show me all', next: 'sez_all' },
    ],
  },
  sez_corp_tax: {
    type: 'info',
    text: "Qualifying businesses get a 5% corporate tax rate for up to 15 years (vs. Malaysia's standard 24%) — covering manufacturing, digital economy, financial services, logistics, and more.",
    next: 'soft_ask',
    intent: 'JS-SEZ Tax Incentives',
  },
  sez_worker_tax: {
    type: 'info',
    text: 'Knowledge workers earning ≥RM 20,000/month in qualifying sectors get a flat 15% personal income tax rate for up to 10 years, vs. progressive rates up to 30%.',
    next: 'soft_ask',
    intent: 'JS-SEZ Tax Incentives',
  },
  sez_all: {
    type: 'info',
    text: 'The JS-SEZ offers a 5% corporate tax rate (up to 15 years), a 15% flat tax for knowledge workers, a 0% rate for qualifying family offices, and a 100% investment tax allowance on new capex — across 11 priority sectors and 9 flagship zones.',
    next: 'soft_ask',
    intent: 'JS-SEZ Tax Incentives',
  },

  incorp_menu: {
    type: 'menu',
    text: 'What do you need help with?',
    options: [
      { label: 'Setting up a new entity', next: 'incorp_new' },
      { label: 'Ongoing compliance / company secretary', next: 'incorp_compliance' },
      { label: 'Work passes / hiring', next: 'incorp_workpass' },
    ],
  },
  incorp_new: {
    type: 'info',
    text: 'We handle Sdn Bhd setup, SSM registration, resident director arrangements, and entity structuring for foreign-owned businesses in Malaysia.',
    next: 'soft_ask',
    intent: 'Company Incorporation',
  },
  incorp_compliance: {
    type: 'info',
    text: 'We provide company secretary services, annual returns, audited accounts, and ongoing SSM/LHDN filings to keep your entity in good standing.',
    next: 'soft_ask',
    intent: 'Corporate Compliance',
  },
  incorp_workpass: {
    type: 'info',
    text: 'We guide Employment Act compliance, EPF/SOCSO/EIS registration, Employment Pass applications, and knowledge worker tax optimization.',
    next: 'soft_ask',
    intent: 'Employment & Work Passes',
  },

  soft_ask: {
    type: 'menu',
    text: 'Want us to follow up with specifics for your business?',
    options: [
      { label: 'Yes, get in touch', next: 'capture' },
      { label: 'Not now — back to menu', next: 'root' },
    ],
  },

  capture: {
    type: 'capture',
    text: "Happy to connect you. Quick details first — we'll be in touch within one business day.",
  },

  end: {
    type: 'end',
    text: "Thanks! We've received your inquiry and will respond within one business day.",
  },
}
