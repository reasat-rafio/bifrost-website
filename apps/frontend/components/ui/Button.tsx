import clsx from 'clsx'
import React, { forwardRef, ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import styles from '@styles/button.module.scss'
import { GradientBorder } from 'components/common/GradientBorder'

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
    'outline-none xl:text-base text-sm text-white xl:px-8 px-10 py-3 xl:py-3 2xl:py-3 transition-all ease-in-out duration-300 xl:w-auto w-full relative rounded-[4px]',
    // variant === 'primary' && styles.primary,
    // variant === 'secondary' && styles.secondary,
    styles.button,
    loading && 'cursor-not-allowed',
    disabled && 'cursor-not-allowed hover:cursor-not-allowed brightness-75',
    className,
  )

  return (
    <>
      {variant === 'primary' && (
        <GradientBorder borderRadious="4px">
          <motion.button
            whileHover={{
              opacity: [0.9, 1],
            }}
            ref={ref}
            aria-pressed={active}
            disabled={disabled}
            className={clsx(rootClassName, styles.primary)}
            {...rest}
          >
            {children}
          </motion.button>
        </GradientBorder>
      )}
      {variant === 'secondary' && (
        <motion.button
          whileHover={{
            opacity: [0.9, 1],
          }}
          ref={ref}
          aria-pressed={active}
          disabled={disabled}
          className={clsx(rootClassName, styles.secondary)}
          {...rest}
        >
          {children}
        </motion.button>
      )}
    </>
  )
})

Button.displayName = 'Button'

export default Button
