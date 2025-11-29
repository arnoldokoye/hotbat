import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
};

/**
 * Badge renders small status labels with subtle styling.
 */
export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const styles: Record<typeof variant, string> = {
    default: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100",
    success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-100",
    danger: "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-100",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
