import isCI from "is-ci";
import fs from "node:fs/promises";
import { Puzzle } from "./types.ts";

export class Day2 extends Puzzle {
  async part1(): Promise<string | number> {
    return this.input.split(/,/).reduce((prev, curr) => {
      const [low, high] = curr.split(/-/);
      const numDigits = Math.floor(Math.max(low!.length, high!.length) / 2);
      const range = Array(Number(high) - Number(low) + 1)
        .fill(0)
        .map((_, i) => i + Number(low));
      const hasDouble = new RegExp(`(\\d{${numDigits}})\\1`);
      const doubles = range.filter(
        (n) =>
          hasDouble.test(n.toString()) && n.toString().length === numDigits * 2,
      );
      return prev + doubles.reduce((sum, num) => sum + num, 0);
    }, 0);
  }

  async part2(): Promise<string | number> {
    return this.input.split(/,/).reduce((prev, curr) => {
      const [low, high] = curr.split(/-/);
      const range = Array(Number(high) - Number(low) + 1)
        .fill(0)
        .map((_, i) => i + Number(low));
      const doubles = range.filter((n) => /^(\d+)\1+$/.test(n.toString()));
      return prev + doubles.reduce((sum, num) => sum + num, 0);
    }, 0);
  }
}

const solve = async (input: string) => {
  const puzzle = new Day2(input);
  console.log("Part 1: ", await puzzle.part1());
  console.log("Part 2: ", await puzzle.part2());
};

if (!isCI) {
  const input = await fs.readFile("input/day2.txt", { encoding: "utf8" });
  await solve(input);
}
