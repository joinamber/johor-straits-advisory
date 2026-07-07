export default function Hero() {
  return (
    <section
      id="top"
      className="hero-ambient relative flex min-h-screen items-center overflow-hidden text-soft-white"
    >
      {/* Soft decorative glow — abstract, water-at-dawn feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-calm-sky/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-strait-teal/20 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-content px-6 py-32">
        <p className="eyebrow mb-6 text-calm-sky">Johor–Singapore Special Economic Zone</p>

        <h1 className="max-w-4xl font-display text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Your Bridge to Johor&rsquo;s New Economy
        </h1>

        <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-mist sm:text-xl">
          Tax advisory, company incorporation, and cross-border strategy for Singapore
          businesses expanding into the Johor-Singapore Special Economic Zone.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a href="#contact" className="btn-primary">
            Get Started
          </a>
          <a href="#js-sez" className="btn-secondary">
            Explore JS-SEZ Benefits
          </a>
        </div>
      </div>
    </section>
  )
}
