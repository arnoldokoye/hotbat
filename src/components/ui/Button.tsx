import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

/**
 * Button provides consistent styling variants and sizes for interactive elements.
 */
export function Button({
  variant = "secondary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-slate-900 text-white shadow-sm hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white",
    secondary:
      "border border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-700 dark:hover:bg-slate-800",
    ghost:
      "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
    icon:
      "border border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-700 dark:hover:bg-slate-800",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-2 text-sm",
  };

  const composed = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={composed} {...props}>
      {children}
    </button>
  );
}
