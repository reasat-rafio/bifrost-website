import clsx from 'clsx'

interface TitleProps {
  children: React.ReactNode
  className?: string
}

export const Title: React.FC<TitleProps> = ({ children, className }) => {
  return <h2 className={clsx(className, 'capitalize text-teal text-[24px]')}>{children}</h2>
}
