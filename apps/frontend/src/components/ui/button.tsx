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
  variant?: 'primary' | 'secondary' | 'outline'
  color?: 'pink' | 'green'
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  active,
  children,
  className = 'xl:px-12 px-8 py-2 xl:py-3',
  disabled,
  loading,
  href,
  type,
  variant = 'primary',
  color = 'green',
  onClick,
}) => {
  const rootClassName = clsx(
    'w-fit relative | xl:text-body-3 md:text-[12px] text-[10px] | rounded-[4px] | !transition-all !ease-in-out duration-300 | outline-none uppercase | hover:shadow',
    loading && '!cursor-not-allowed',
    disabled && 'cursor-not-allowed hover:cursor-not-allowed brightness-75',
    className,
    variant === 'secondary' && 'text-black',
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
              ? clsx(
                  rootClassName,
                  color === 'pink' &&
                    `${styles.secondary_bg_gradient_pink} bg-gradient-to-r from-primary to-primary`,
                  color === 'green' &&
                    `${styles.secondary_bg_gradient_green} bg-gradient-to-r from-teal to-teal`,
                )
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
              ? clsx(
                  rootClassName,
                  color === 'pink' &&
                    `${styles.secondary_bg_gradient_pink} bg-gradient-to-r from-primary to-primary`,
                  color === 'green' &&
                    `${styles.secondary_bg_gradient_green} bg-gradient-to-r from-teal to-teal`,
                )
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
      type="button"
      aria-pressed={active}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      <span>
        {loading && <LoadingIcon />}
        {children}
      </span>
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
