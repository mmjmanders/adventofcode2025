import isCI from "is-ci";
import fs from "node:fs/promises";
import { Puzzle } from "./types.ts";

export class Day7 extends Puzzle {
  private countTachyonSplits(grid: string[]): number {
    if (grid.length === 0) return 0;
    const R = grid.length;
    const C = grid[0]!.length;

    // find S
    let startR = -1,
      startC = -1;
    for (let r = 0; r < R; r++) {
      const c = grid[r]!.indexOf("S");
      if (c >= 0) {
        startR = r;
        startC = c;
        break;
      }
    }
    if (startR === -1) throw new Error("No starting 'S' found in grid");

    // beams start moving downward from the cell below S
    let currentRow = startR + 1;
    let currentCols = new Set<number>();
    if (currentRow < R) currentCols.add(startC);

    let splitCount = 0;

    // process each row until out of grid or no beams remain
    while (currentRow < R && currentCols.size > 0) {
      // We'll process chain reactions in this row using a queue.
      const processed = new Set<number>(); // columns we've already processed in this row
      const nextRowCols = new Set<number>(); // columns that will continue to the next row
      const queue: number[] = [...currentCols];

      while (queue.length > 0) {
        const c = queue.pop()!;
        if (processed.has(c)) continue;
        processed.add(c);

        // skip out-of-bounds columns (safety)
        if (c < 0 || c >= C) continue;

        const cell = grid[currentRow]![c]!;
        if (cell === "^") {
          // beam hits splitter here -> split
          splitCount++;
          // new beams appear immediately to left and right (same row)
          const left = c - 1;
          const right = c + 1;
          if (left >= 0 && !processed.has(left)) queue.push(left);
          if (right < C && !processed.has(right)) queue.push(right);
          // original beam stops (doesn't go to next row)
        } else {
          // beam passes through ('.' or 'S' etc.) and continues to the next row
          // we treat multiple beams in same column as one by using a Set
          if (currentRow + 1 < R) nextRowCols.add(c);
          // if at last row, the beam exits and nothing is added
        }
      }

      // move down
      currentRow++;
      currentCols = nextRowCols;
    }

    return splitCount;
  }

  private countQuantumTimelines(grid: string[]): number {
    const R = grid.length;
    const C = grid[0]!.length;

    // locate S
    let startR = -1,
      startC = -1;
    for (let r = 0; r < R; r++) {
      const c = grid[r]!.indexOf("S");
      if (c >= 0) {
        startR = r;
        startC = c;
        break;
      }
    }
    if (startR === -1) throw new Error("Start 'S' not found.");

    // Memo: (r,c) → number of resulting timelines
    const memo = new Map<string, number>();
    const key = (r: number, c: number) => `${r},${c}`;

    function dfs(r: number, c: number): number {
      // Out of bounds → this branch exits the manifold → 1 timeline
      if (r >= R || c < 0 || c >= C) return 1;

      const k = key(r, c);
      if (memo.has(k)) return memo.get(k)!;

      const cell = grid[r]![c]!;
      let result: number;

      if (cell === "^") {
        // time splits: down-left and down-right
        const left = dfs(r + 1, c - 1);
        const right = dfs(r + 1, c + 1);
        result = left + right; // independent timelines accumulate
      } else {
        // normal tile: move downward
        result = dfs(r + 1, c);
      }

      memo.set(k, result);
      return result;
    }

    // Start below S
    return dfs(startR + 1, startC);
  }

  async part1(): Promise<string | number> {
    return this.countTachyonSplits(this.input.split(/\r?\n/));
  }

  async part2(): Promise<string | number> {
    return this.countQuantumTimelines(this.input.split(/\r?\n/));
  }
}

if (!isCI) {
  const input = await fs.readFile("input/day7.txt", { encoding: "utf8" });
  const puzzle = new Day7(input);
  console.log("Part 1: ", await puzzle.part1());
  console.log("Part 2: ", await puzzle.part2());
}
