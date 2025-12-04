import isCI from "is-ci";
import fs from "node:fs/promises";
import { Puzzle } from "./types.ts";

export class Day4 extends Puzzle {
  private directions = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];

  async part1(): Promise<string | number> {
    const grid = this.input.split(/\r?\n/).map((row) => row.split(""));
    const height = grid.length;
    const width = grid[0]!.length;

    let accessibleRolls = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Only check if the current cell is a roll "@"
        if (grid[y]![x] !== "@") continue;

        let adjacentRolls = 0;

        for (const [dx, dy] of this.directions) {
          const nx = x + dx!;
          const ny = y + dy!;

          // Bounds check
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;

          if (grid[ny]![nx] === "@") {
            adjacentRolls++;
          }
        }

        // Rule: fewer than 4 adjacent rolls = accessible
        if (adjacentRolls < 4) {
          accessibleRolls++;
        }
      }
    }

    return accessibleRolls;
  }

  async part2(): Promise<string | number> {
    const grid = this.input.split(/\r?\n/).map((row) => row.split(""));
    const height = grid.length;
    const width = grid[0]!.length;

    let totalRemoved = 0;

    while (true) {
      const toRemove: [number, number][] = [];

      // Step 1: Find all currently accessible rolls
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (grid[y]![x] !== "@") continue;

          let adjacent = 0;

          for (const [dx, dy] of this.directions) {
            const nx = x + dx!;
            const ny = y + dy!;

            if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
            if (grid[ny]![nx] === "@") adjacent++;
          }

          if (adjacent < 4) {
            toRemove.push([x, y]);
          }
        }
      }

      // Step 2: If nothing is removable, we are done
      if (toRemove.length === 0) break;

      // Step 3: Remove everything found this round
      for (const [x, y] of toRemove) {
        grid[y]![x] = ".";
      }

      totalRemoved += toRemove.length;
    }

    return totalRemoved;
  }
}

if (!isCI) {
  const input = await fs.readFile("input/day4.txt", { encoding: "utf8" });
  const puzzle = new Day4(input);
  console.log("Part 1: ", await puzzle.part1());
  console.log("Part 2: ", await puzzle.part2());
}
