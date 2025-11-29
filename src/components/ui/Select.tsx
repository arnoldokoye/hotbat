import { SelectHTMLAttributes, forwardRef } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

/**
 * Select standardizes dropdown styling.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, className = "", children, ...props }, ref) => {
    return (
      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
        {label && <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>}
        <select
          ref={ref}
          className={`h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-700 ${className}`}
          {...props}
        >
          {children}
        </select>
      </label>
    );
  },
);

Select.displayName = "Select";
