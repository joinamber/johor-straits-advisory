import { useEffect, useRef, useState } from 'react'

/**
 * Lightweight scroll-reveal hook built on the native Intersection Observer.
 * Adds the `is-visible` class (see index.css) once an element scrolls into view.
 * Observation stops after the first reveal so it only animates once.
 *
 * Usage:
 *   const [ref, isVisible] = useIntersectionObserver()
 *   <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''}`}>
 *
 * @param {IntersectionObserverInit} options
 * @returns {[React.RefObject, boolean]}
 */
export default function useIntersectionObserver(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // If IO is unsupported (or reduced motion), just show the content.
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px', ...options }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [options])

  return [ref, isVisible]
}
