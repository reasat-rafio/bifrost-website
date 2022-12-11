import clsx from 'clsx'
import { LoadingIcon } from 'components/icons/loading'
import { motion } from 'framer-motion'
import styles from '@styles/button.module.scss'
import React from 'react'
import Link from 'next/link'

interface ButtonProps {
  className?: string
  active?: boolean
  type?: 'submit' | 'reset' | 'button' | 'href'
  loading?: boolean
  disabled?: boolean
  href?: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  active,
  children,
  className,
  disabled,
  loading,
  href,
  type,
  variant = 'primary',
  onClick,
}) => {
  const rootClassName = clsx(
    'xl:w-auto w-full relative | text-[10px] sm:text-base | text-white | xl:px-8 px-10 py-3 xl:py-3 2xl:py-3 | rounded-[4px] | !transition-all !ease-in-out duration-300 | outline-none ',
    loading && '!cursor-not-allowed',
    disabled && 'cursor-not-allowed hover:cursor-not-allowed brightness-75',
    className,
  )
  return (
    <>
      {type === 'button' && (
        <MotionButton
          active={active}
          children={loading ? 'Loading' : children}
          onClick={onClick}
          disabled={disabled}
          loading={loading}
          className={
            variant === 'secondary'
              ? clsx(rootClassName, styles.secondary_bg_gradient, styles.secondary_border_gradient)
              : variant === 'primary'
              ? clsx(rootClassName, styles.primary_border_gradient)
              : ''
          }
        />
      )}

      {type === 'href' && (
        <MotionHref
          children={children}
          href={href}
          className={
            variant === 'secondary'
              ? clsx(rootClassName, styles.secondary_bg_gradient, styles.secondary_border_gradient)
              : variant === 'primary'
              ? clsx(rootClassName, styles.primary_border_gradient)
              : ''
          }
        />
      )}
    </>
  )
}

const MotionButton: React.FC<{
  active: boolean
  className: string
  disabled: boolean
  loading: boolean
  children: React.ReactNode
  onClick: () => void
}> = ({ active, disabled, className, loading, children, onClick }) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.03,
      }}
      type="button"
      aria-pressed={active}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      <>
        {loading && <LoadingIcon />}
        {children}
      </>
    </motion.button>
  )
}

const MotionHref: React.FC<{
  className: string
  children: React.ReactNode
  href: string
}> = ({ className, children, href }) => {
  return (
    <Link passHref href={href}>
      <motion.a className={className}>
        <>{children}</>
      </motion.a>
    </Link>
  )
}
