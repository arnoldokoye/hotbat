import type { BackendMode, DataBackend } from "@/lib/backend/DataBackend";
import { CsvBackend } from "@/lib/backend/CsvBackend";
import { DbBackend } from "@/lib/backend/DbBackend";
import { AutoBackend, resolveBackendMode } from "@/lib/backend/AutoBackend";

export function getBackend(mode: BackendMode): DataBackend {
  if (mode === "csv") return new CsvBackend();
  if (mode === "db") return new DbBackend();
  return new AutoBackend();
}

export function getBackendFromEnv(): DataBackend {
  const mode = resolveBackendMode(process.env.HOTBAT_BACKEND);
  return getBackend(mode);
}

