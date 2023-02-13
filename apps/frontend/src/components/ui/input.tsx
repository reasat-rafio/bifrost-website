import clsx from "clsx";
import React, { InputHTMLAttributes } from "react";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  innerClassName?: string;
  inputClassName?: string;
  placeholderKey?: string;
  name: string;
  errorKey?: string;
  type?: string;
  shadow?: boolean;
}

const Input = React.forwardRef<any, any>(
  (
    {
      className = "",
      innerClassName,
      name,
      errorKey,
      placeholderKey,
      shadow = false,
      type = "text",
      inputClassName,
      ...rest
    },
    ref
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
          className={clsx(
            innerClassName,
            "text-gray-700 focus:shadow-outline w-full appearance-none rounded-lg border border-[#8E8E8E] bg-transparent py-3 px-5 leading-tight shadow focus:outline-none focus:ring-0 focus-visible:ring-1 focus-visible:ring-honeySuckle md:py-5"
          )}
          autoComplete="off"
          spellCheck="false"
          aria-invalid={errorKey ? "true" : "false"}
          {...rest}
        />

        {errorKey && <p className="my-2 text-xs text-danger">{errorKey}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
