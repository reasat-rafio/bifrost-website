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
  textColor?: string;
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
      textColor = "#B6B6B6",
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
          placeholder={placeholderKey}
          style={{ color: textColor }}
          className={clsx(
            innerClassName,
            "focus:shadow-outline w-full appearance-none rounded-[10px] border border-[#43434A] bg-transparent py-3 px-5 text-sm leading-tight shadow focus:outline-none focus:ring-0 focus-visible:ring-1 focus-visible:ring-honeySuckle sm:text-body-3 md:py-5"
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
