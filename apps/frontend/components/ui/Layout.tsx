import clsx from 'clsx'
import { ReactElement, ReactNode } from 'react'

interface LayoutProps {
  className?: string
  children?: ReactNode
}

export default function Layout({ children, className }: LayoutProps): ReactElement {
  return <main className={clsx(className, '!overflow-x-hidden')}>{children}</main>
}
