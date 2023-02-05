import clsx from "clsx";
import { LoadingIcon } from "components/icons/loading";
import { motion } from "framer-motion";
import styles from "@styles/button.module.scss";
import React from "react";
import Link from "next/link";

interface ButtonProps {
  className?: string;
  active?: boolean;
  type?: "submit" | "reset" | "button" | "href";
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  color?: "pink" | "green";
  actionType?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  active,
  children,
  actionType,
  disabled,
  loading,
  href,
  type,
  variant = "primary",
  color = "green",
  className = variant !== "outline" && "xl:px-12 px-8 py-2 xl:py-3",

  onClick,
}) => {
  const rootClassName = clsx(
    "w-fit relative | xl:text-body-3 text-[14px] | rounded-[4px] | !transition-all !ease-in-out duration-300 | outline-none uppercase | hover:shadow",
    loading && "!cursor-not-allowed",
    disabled && "cursor-not-allowed hover:cursor-not-allowed brightness-75",
    className,
    variant === "secondary" && "text-black"
  );
  return (
    <>
      {type === "button" && (
        <MotionButton
          active={active}
          children={loading ? "Loading" : children}
          onClick={onClick}
          disabled={disabled}
          loading={loading}
          variant={variant}
          actionType={actionType}
          className={
            variant === "secondary"
              ? clsx(
                  rootClassName,
                  color === "pink" &&
                    `${styles.secondary_bg_gradient_pink} bg-gradient-to-r from-primary to-primary`,
                  color === "green" &&
                    `${styles.secondary_bg_gradient_green} bg-gradient-to-r from-teal to-teal`
                )
              : variant === "primary"
              ? clsx(rootClassName, styles.primary_border_gradient)
              : variant === "outline"
              ? clsx(
                  rootClassName,
                  "!text-left",
                  color === "pink" && "text-primary",
                  color === "green" && "text-teal"
                )
              : null
          }
        />
      )}

      {type === "href" && (
        <MotionHref
          children={children}
          href={href}
          variant={variant}
          className={
            variant === "secondary"
              ? clsx(
                  rootClassName,
                  color === "pink" &&
                    `${styles.secondary_bg_gradient_pink} bg-gradient-to-r from-primary to-primary`,
                  color === "green" &&
                    `${styles.secondary_bg_gradient_green} bg-gradient-to-r from-teal to-teal`
                )
              : variant === "primary"
              ? clsx(rootClassName, styles.primary_border_gradient)
              : variant === "outline"
              ? clsx(
                  rootClassName,
                  "!text-left",
                  color === "pink" && "text-primary",
                  color === "green" && "text-teal"
                )
              : null
          }
        />
      )}
    </>
  );
};

const MotionButton: React.FC<{
  active: boolean;
  className: string;
  disabled: boolean;
  loading: boolean;
  children: React.ReactNode;
  actionType: string;
  onClick: () => void;
  variant: "primary" | "secondary" | "outline";
}> = ({
  active,
  disabled,
  className,
  loading,
  children,
  variant,
  actionType,
  onClick,
}) => {
  return (
    <motion.button
      type={(actionType as any) ?? "button"}
      aria-pressed={active}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {variant !== "outline" ? (
        <span>
          {loading && <LoadingIcon />}
          {children}
        </span>
      ) : (
        <span className="flex items-center space-x-2">
          {loading && <LoadingIcon />}
          <span>{children}</span>
          <ArrowRight className="w-7" />
        </span>
      )}
    </motion.button>
  );
};

const MotionHref: React.FC<{
  className: string;
  children: React.ReactNode;
  href: string;
  variant: "primary" | "secondary" | "outline";
}> = ({ className, children, href, variant }) => {
  return (
    <Link passHref href={href}>
      {variant !== "outline" ? (
        <motion.a className={className}>
          <>{children}</>
        </motion.a>
      ) : (
        <motion.a className={clsx(className, "flex items-center space-x-2")}>
          <span>{children}</span>
          <ArrowRight className="w-7" />
        </motion.a>
      )}
    </Link>
  );
};

const ArrowRight: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  );
};
