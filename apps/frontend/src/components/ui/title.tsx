import clsx from 'clsx'

interface TitleProps {
  children: React.ReactNode
  className?: string
}

export const Title: React.FC<TitleProps> = ({ children, className }) => {
  return (
    <h2 className={clsx(className, 'capitalize text-teal lg:text-[24px] sm:text-xl text-lg')}>
      {children}
    </h2>
  )
}
