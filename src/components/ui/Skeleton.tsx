import { HTMLAttributes } from "react";

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

/**
 * Skeleton provides a simple loading placeholder block.
 */
export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-200 dark:bg-slate-800 ${className}`}
      {...props}
    />
  );
}
