import { ReactNode } from "react";

type TableProps = { children: ReactNode; className?: string };

/**
 * Table primitives standardize table styling for data views.
 */
export function Table({ children, className = "" }: TableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full text-sm text-slate-800 dark:text-slate-100">
        {children}
      </table>
    </div>
  );
}

type SectionProps = { children: ReactNode; className?: string };

export function Thead({ children, className = "" }: SectionProps) {
  return (
    <thead
      className={`bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-300 ${className}`}
    >
      {children}
    </thead>
  );
}

export function Tbody({ children, className = "" }: SectionProps) {
  return <tbody className={className}>{children}</tbody>;
}

export function Tr({ children, className = "" }: SectionProps) {
  return (
    <tr className={`border-b border-slate-100 last:border-0 dark:border-slate-800 ${className}`}>
      {children}
    </tr>
  );
}

export function Th({ children, className = "" }: SectionProps) {
  return <th className={`px-3 py-2 ${className}`}>{children}</th>;
}

export function Td({ children, className = "" }: SectionProps) {
  return <td className={`px-3 py-2 ${className}`}>{children}</td>;
}
