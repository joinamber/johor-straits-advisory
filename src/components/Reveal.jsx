import useIntersectionObserver from '../hooks/useIntersectionObserver'

/**
 * Wraps children in a scroll-reveal container. Renders as the given element
 * (`as` prop) so it can slot naturally into semantic layouts.
 */
export default function Reveal({ as: Tag = 'div', className = '', style, children, ...rest }) {
  const [ref, isVisible] = useIntersectionObserver()
  return (
    <Tag
      ref={ref}
      style={style}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
