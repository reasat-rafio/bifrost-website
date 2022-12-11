import React, { InputHTMLAttributes } from 'react'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  inputClassName?: string
  placeholderKey?: string
  name: string
  errorKey?: string
  type?: string
  shadow?: boolean
}

const Input = React.forwardRef<any, any>(
  (
    {
      className = '',
      name,
      errorKey,
      placeholderKey,
      shadow = false,
      type = 'text',
      inputClassName,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={className}>
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          // @ts-ignore
          placeholder={placeholderKey}
          className="w-full | border border-[#8E8E8E] rounded-lg | md:py-5 py-3 px-5 | bg-transparent | text-gray-700 leading-tight | shadow | appearance-none focus:outline-none focus:shadow-outline focus-visible:ring-honeySuckle focus:ring-0 focus-visible:ring-1"
          autoComplete="off"
          spellCheck="false"
          aria-invalid={errorKey ? 'true' : 'false'}
          {...rest}
        />

        {errorKey && <p className="my-2 text-xs text-red-500">{errorKey}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'
export default Input
