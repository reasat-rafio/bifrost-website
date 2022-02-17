import { ReactElement } from 'react'

interface EllipseProps {
  className?: string
  color?: string
}

export default function Ellipse(props: EllipseProps): ReactElement {
  const { className, color = 'rgba(255, 255, 255, 0.26)' } = props
  return (
    <div className="relative">
      <div className={className} style={{ filter: 'blur(158px)', background: color }} />
    </div>
  )
}
