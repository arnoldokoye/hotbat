import { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * PageContainer constrains page content to a comfortable width with standard padding.
 */
export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-screen-2xl px-4 md:px-6 ${className}`}>
      {children}
    </div>
  );
}
