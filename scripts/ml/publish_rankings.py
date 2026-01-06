#!/usr/bin/env python3
from __future__ import annotations

import shutil
import sys
from pathlib import Path

DEFAULT_INPUT = Path("scripts/ml/data/player_game_hr_rankings_v1_all_seasons.csv")
DEFAULT_OUTPUT_DIR = Path("public/data")


def main() -> int:
    args = sys.argv[1:]
    input_path = DEFAULT_INPUT
    output_dir = DEFAULT_OUTPUT_DIR
    if args:
        input_path = Path(args[0])
    if len(args) > 1:
        output_dir = Path(args[1])

    if not input_path.exists():
        sys.exit(f"Missing {input_path}")

    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / input_path.name
    shutil.copyfile(input_path, output_path)
    print(f"Published {input_path} → {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
