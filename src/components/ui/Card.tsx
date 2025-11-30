import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  dataTestId?: string;
};

type CardSectionProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Card is a simple container with shared padding, border, and background styling.
 */
export function Card({ children, className = "", dataTestId }: CardProps) {
  return (
    <div
      data-testid={dataTestId}
      className={`rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: CardSectionProps) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 text-slate-900 dark:border-slate-800 dark:text-slate-50 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardBody({ children, className = "" }: CardSectionProps) {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }: CardSectionProps) {
  return (
    <div
      className={`border-t border-slate-100 px-5 py-4 dark:border-slate-800 ${className}`}
    >
      {children}
    </div>
  );
}
