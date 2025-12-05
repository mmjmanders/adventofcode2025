import isCI from "is-ci";
import fs from "node:fs/promises";
import { Puzzle } from "./types.ts";

type Range = [number, number];

export class Day5 extends Puzzle {
  private mergeRanges(ranges: Range[]): Range[] {
    const sorted = ranges.slice().sort((a, b) => a[0] - b[0]);
    const merged: Range[] = [];

    for (const [start, end] of sorted) {
      if (merged.length === 0) {
        merged.push([start, end]);
      } else {
        const last = merged[merged.length - 1];
        if (start <= last![1]) {
          last![1] = Math.max(last![1], end); // merge
        } else {
          merged.push([start, end]);
        }
      }
    }

    return merged;
  }

  async part1(): Promise<string | number> {
    const data = this.input.split(/\r?\n/);
    const blank = data.findIndex((s) => s.trim().length === 0);
    const ingredients = data.slice(blank + 1).map(Number);
    const ids = data.slice(0, blank).map((range) => {
      const [min, max] = range.split(/-/).map(Number);
      return [min!, max!];
    });

    return ingredients.reduce((prev, curr) => {
      return ids.find((id) => curr >= id[0]! && curr <= id[1]!)
        ? prev + 1
        : prev;
    }, 0);
  }

  async part2(): Promise<string | number> {
    const data = this.input.split(/\r?\n/);
    const blank = data.findIndex((s) => s.trim().length === 0);
    return this.mergeRanges(
      data
        .slice(0, blank)
        .map((range) => range.split(/-/).map(Number) as Range),
    ).reduce((prev, curr) => curr[1] - curr[0] + 1 + prev, 0);
  }
}

if (!isCI) {
  const input = await fs.readFile("input/day5.txt", { encoding: "utf8" });
  const puzzle = new Day5(input);
  console.log("Part 1: ", await puzzle.part1());
  console.log("Part 2: ", await puzzle.part2());
}
