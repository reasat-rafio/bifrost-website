import clsx from 'clsx'
import React from 'react'

interface ArrowLeftProps {
  className?: string
}

export const ArrowLeft: React.FC<ArrowLeftProps> = ({ className = 'h-[34px] w-[34px]' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        'hover:scale-x-125  origin-right transition-all duration-300 hover:text-[#ACFFEB]',
        className,
      )}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
    </svg>
  )
}
