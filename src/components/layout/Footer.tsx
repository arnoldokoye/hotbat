import { PageContainer } from "@/components/ui/PageContainer";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <PageContainer className="flex items-center justify-between py-4 text-sm text-slate-600 dark:text-slate-300">
        <span>HotBat v0.1.0</span>
        <span className="text-slate-400 dark:text-slate-500">Internal preview</span>
      </PageContainer>
    </footer>
  );
}
