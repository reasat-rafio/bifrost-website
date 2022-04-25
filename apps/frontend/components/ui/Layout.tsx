import clsx from 'clsx'
import { ReactElement } from 'react'

interface LayoutProps {
  className?: string
  children?: any
}

export default function Layout({ children, className }: LayoutProps): ReactElement {
  return <main className={clsx(className, '!overflow-x-hidden')}>{children}</main>
}
