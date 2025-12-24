import fs from "node:fs/promises";

export function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];

    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i += 1;
        continue;
      }
      inQuotes = !inQuotes;
      continue;
    }

    if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
      continue;
    }

    cur += ch;
  }

  out.push(cur);
  return out;
}

export function parseCsvText(text: string): { header: string[]; rows: string[][] } {
  const stripped = text.replace(/^\uFEFF/, "").trim();
  if (!stripped) return { header: [], rows: [] };

  const lines = stripped.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return { header: [], rows: [] };

  const header = splitCsvLine(lines[0]).map((h) => h.trim());
  const rows = lines.slice(1).map((line) => splitCsvLine(line).map((c) => c.trim()));
  return { header, rows };
}

export async function readCsvFile(filePath: string): Promise<{ header: string[]; rows: string[][]; mtimeMs: number }> {
  const stat = await fs.stat(filePath);
  const text = await fs.readFile(filePath, "utf8");
  const { header, rows } = parseCsvText(text);
  return { header, rows, mtimeMs: stat.mtimeMs };
}

