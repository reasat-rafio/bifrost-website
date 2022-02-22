import clsx from 'clsx'
import React, { forwardRef, ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import styles from '@styles/button.module.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  loading?: boolean
  disabled?: boolean
  hidden?: boolean
  color?: 'primary' | 'secondary'
}

const Button = forwardRef<HTMLButtonElement, any>((props, ref) => {
  const {
    className,
    children,
    active,
    loading = false,
    disabled = false,
    color = 'primary',
    hidden,
    ...rest
  } = props

  const rootClassName = clsx(
    'outline-none xl:text-base text-sm text-white xl:px-8 px-10 py-3 xl:py-3 2xl:py-3 transition-all ease-in-out hover:duration-300 delay-50 duration-300 xl:w-auto w-full relative',
    color === 'primary' && styles.primary,
    color === 'secondary' && styles.secondary,
    styles.button,
    loading && 'cursor-not-allowed',
    disabled && 'cursor-not-allowed hover:cursor-not-allowed brightness-75',
    hidden ? 'hidden' : 'block',
    className,
  )

  return (
    <motion.div
      whileHover={{
        scale: 1.01,
        transition: { ease: 'easeInOut', duration: 0.05 },
      }}
      aria-pressed={active}
      className={clsx('transition-all duration-150', color === 'primary' && styles.border_gradient)}
    >
      <motion.button
        type="button"
        aria-pressed={active}
        ref={ref}
        className={rootClassName}
        disabled={disabled}
        {...rest}
      >
        {children}
      </motion.button>
    </motion.div>
  )
})

Button.displayName = 'Button'

export default Button
