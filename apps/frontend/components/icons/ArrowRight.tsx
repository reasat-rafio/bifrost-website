import clsx from 'clsx'
import React from 'react'

interface ArrowRightProps {
  className?: string
}

export const ArrowRight: React.FC<ArrowRightProps> = ({ className = 'h-[34px] w-[34px]' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        'hover:scale-x-125 origin-left transition-all duration-300 hover:text-[#ACFFEB]',
        className,
      )}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}
