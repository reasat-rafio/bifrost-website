import clsx from 'clsx'
import React, { forwardRef, ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import styles from '@styles/button.module.scss'
import { LoadingIcon } from 'components/icons/loading'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  loading?: boolean
  disabled?: boolean
  hidden?: boolean
  variant?: 'primary' | 'secondary'
}

const Button = forwardRef<HTMLButtonElement, any>((props, ref) => {
  const {
    className,
    children,
    active,
    loading = false,
    disabled = false,
    variant = 'primary',
    ...rest
  } = props

  const rootClassName = clsx(
    'xl:w-auto w-full relative | text-[10px] sm:text-base | text-white | xl:px-8 px-10 py-3 xl:py-3 2xl:py-3 | rounded-[4px] | !transition-all !ease-in-out duration-300 | outline-none ',
    loading && '!cursor-not-allowed',
    disabled && 'cursor-not-allowed hover:cursor-not-allowed brightness-75',
    className,
  )

  const text = loading ? 'Loading' : children

  return (
    <div>
      {variant === 'primary' && (
        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          type="button"
          aria-pressed={active}
          ref={ref}
          className={clsx(rootClassName, styles.primary_border_gradient)}
          disabled={disabled}
          {...rest}
        >
          {loading && <LoadingIcon />}
          {text}
        </motion.button>
      )}

      {variant === 'secondary' && (
        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          type="button"
          aria-pressed={active}
          ref={ref}
          className={clsx(
            rootClassName,
            styles.secondary_bg_gradient,
            styles.secondary_border_gradient,
          )}
          disabled={disabled}
          {...rest}
        >
          {loading && <LoadingIcon />}
          {text}
        </motion.button>
      )}
    </div>
  )
})

Button.displayName = 'Button'

export default Button
