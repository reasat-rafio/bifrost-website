import clsx from 'clsx'

interface TitleProps {
  children: React.ReactNode
  className?: string
  color?: 'green' | 'pink'
}

export const Title: React.FC<TitleProps> = ({ children, className, color = 'green' }) => {
  return (
    <h2
      className={clsx(
        className,
        color === 'green' && 'text-teal',
        color === 'pink' && 'text-mauve',
        'capitalize lg:text-[24px] sm:text-xl text-lg',
      )}
    >
      {children}
    </h2>
  )
}
