import clsx from 'clsx'
import { ReactElement } from 'react'

interface EllipseProps {
  className?: string
}

export default function Ellipse(props: EllipseProps): ReactElement {
  const { className } = props
  return (
    <div className="relative">
      <div
        className={className}
        style={{ filter: 'blur(158px)', background: 'rgba(255, 255, 255, 0.26)' }}
      />
    </div>
  )
}
