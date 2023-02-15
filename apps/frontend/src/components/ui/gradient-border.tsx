import clsx from "clsx";
import React, { forwardRef } from "react";

interface GradientBorderProps {
  className?: string;
  borderSize?: string;
  borderRadious?: string;
  gradient?: string;
  innerClass?: string;
  background?: string;
  children?: any;
  padding?: boolean;
  ref?: React.ForwardedRef<HTMLElement>;
}

export const GradientBorder: React.FC<GradientBorderProps> = forwardRef(
  (
    {
      children,
      padding = true,
      className,
      borderSize = "1px",
      borderRadious = "15px",
      gradient = "primary__gradient",
      innerClass = "",
    },
    ref
  ) => {
    return (
      <section
        ref={ref as React.LegacyRef<HTMLDivElement>}
        className={clsx(
          "flex w-full items-center justify-center",
          padding && "px-5 lg:px-8"
        )}
      >
        <div
          className={clsx(
            className,
            gradient,
            "relative w-full max-w-screen-2xl"
          )}
          style={{ padding: borderSize, borderRadius: borderRadious }}
        >
          <div
            className={clsx(
              innerClass,
              "flex flex-col justify-between bg-red-700"
            )}
            style={{ borderRadius: borderRadious }}
          >
            {children}
          </div>
        </div>
      </section>
    );
  }
);
