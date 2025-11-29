"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

type TabsContextValue = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

type TabsProps = {
  children: ReactNode;
  defaultValue: string;
  className?: string;
};

/**
 * Tabs provides a simple client-side tab system.
 */
export function Tabs({ children, defaultValue, className = "" }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const value = useMemo(() => ({ activeTab, setActiveTab }), [activeTab]);

  return (
    <TabsContext.Provider value={value}>
      <div className={`w-full ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
}

type TabListProps = { children: ReactNode; className?: string };

export function TabList({ children, className = "" }: TabListProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`} role="tablist">
      {children}
    </div>
  );
}

type TabProps = {
  value: string;
  children: ReactNode;
};

export function Tab({ value, children }: TabProps) {
  const ctx = useTabsContext();
  const isActive = ctx.activeTab === value;
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => ctx.setActiveTab(value)}
      className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
        isActive
          ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
      }`}
    >
      {children}
    </button>
  );
}

type TabPanelProps = {
  value: string;
  children: ReactNode;
};

export function TabPanel({ value, children }: TabPanelProps) {
  const ctx = useTabsContext();
  if (ctx.activeTab !== value) return null;
  return <div className="mt-4">{children}</div>;
}

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used within <Tabs>");
  return ctx;
}
