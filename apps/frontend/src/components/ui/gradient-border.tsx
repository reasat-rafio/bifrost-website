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
  maxWidth?: " max-w-screen-2xl" | "max-w-[1230px]";
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
      maxWidth = "max-w-screen-2xl",
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
          className={clsx(className, gradient, maxWidth, "relative w-full")}
          style={{ padding: borderSize, borderRadius: borderRadious }}
        >
          <div
            className={clsx(
              innerClass,
              "flex flex-col justify-between bg-black"
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
