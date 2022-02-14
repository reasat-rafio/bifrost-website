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
  _fill?: boolean
  _outlined?: boolean
}

const Button = forwardRef<HTMLButtonElement, any>((props, ref) => {
  const {
    className,
    children,
    active,
    loading = false,
    disabled = false,
    color = 'primary',
    _fill = true,
    _outlined = false,
    hidden,
    ...rest
  } = props

  const rootClassName = clsx(
    'outline-none text-white 2xl:px-8 xl:px-8 lg:px-10 px-5 py-3 xl:py-3 2xl:py-3 transition-all duration-150 lg:w-auto w-full relative',
    color === 'primary' && _fill && 'bifrost__gradient_dark_blue',
    color === 'secondary' && 'bg-persianBlue',
    styles.button,
    loading && 'cursor-not-allowed',
    disabled && 'cursor-not-allowed hover:cursor-not-allowed brightness-75',
    hidden ? 'hidden' : 'block',
    className,
  )

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { ease: 'easeInOut', duration: 0.05 },
      }}
      // transition={{
      //   delay: 0.3,
      // }}
      aria-pressed={active}
      className={clsx(
        'transition-all duration-150',
        color === 'primary' && _outlined && styles.border_gradient,
      )}
    >
      <motion.button
        // whileHover={{
        //   scale: `${!disabled && 1.04}`,
        //   duration: 0.4,
        //   transition: { ease: 'easeInOut' },
        // }}
        // transition={{
        //   delay: 0.3,
        // }}
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
