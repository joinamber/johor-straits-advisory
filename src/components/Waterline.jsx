/**
 * The signature motif: a thin animated gradient line that drifts between
 * strait-teal and calm-sky — the "waterline" of the strait separating the two
 * lands. Used as a divider between major content chapters.
 */
export default function Waterline({ className = '' }) {
  return (
    <div className={`mx-auto max-w-content px-6 ${className}`} aria-hidden="true">
      <div className="waterline rounded-full" />
    </div>
  )
}
