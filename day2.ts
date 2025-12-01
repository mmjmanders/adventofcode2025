import isCI from "is-ci";
import fs from "node:fs/promises";
import { Puzzle } from "./types.ts";

export class Day2 extends Puzzle {
  async part1(): Promise<string | number> {
    return 0;
  }

  async part2(): Promise<string | number> {
    return 0;
  }
}

const solve = async (input: string) => {
  const puzzle = new Day2(input);
  console.log("Part 1: ", await puzzle.part1());
  console.log("Part 2: ", await puzzle.part2());
};

if (!isCI) {
  const input = await fs.readFile("input/day1.txt", { encoding: "utf8" });
  await solve(input);
}
