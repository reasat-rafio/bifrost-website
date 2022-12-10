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
    const rootClassName =
      'shadow w-full input__dark border border-[#8E8E8E] rounded-lg appearance-none lg:py-6 py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus-visible:ring-honeySuckle focus:ring-0 focus-visible:ring-1'

    return (
      <div className={className}>
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          // @ts-ignore
          placeholder={placeholderKey}
          className={rootClassName}
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
