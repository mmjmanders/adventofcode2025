import isCI from "is-ci";
import fs from "node:fs/promises";
import { Puzzle } from "./types.ts";

export class Day3 extends Puzzle {
  private maxJoltageForBank(bank: string): number {
    let max = 0;

    // Choose first digit (i), then choose second digit (j > i)
    for (let i = 0; i < bank.length - 1; i++) {
      for (let j = i + 1; j < bank.length; j++) {
        const value = parseInt(bank[i]! + bank[j]!, 10);
        if (value > max) max = value;
      }
    }

    return max;
  }

  private maxSubsequenceOfLength(bank: string, k: number): string {
    const stack: string[] = [];
    let toRemove = bank.length - k;

    for (const digit of bank) {
      while (
        toRemove > 0 &&
        stack.length > 0 &&
        stack[stack.length - 1]! < digit
      ) {
        stack.pop();
        toRemove--;
      }
      stack.push(digit);
    }

    // If we didn’t remove enough, remove from the end
    return stack.slice(0, k).join("");
  }

  async part1(): Promise<string | number> {
    return this.input
      .split(/\r?\n/)
      .reduce((sum, bank) => sum + this.maxJoltageForBank(bank), 0);
  }

  async part2(): Promise<string | number> {
    return this.input
      .split(/\r?\n/)
      .map((bank) => this.maxSubsequenceOfLength(bank, 12))
      .reduce((sum, numStr) => sum + Number(numStr), 0);
  }
}

if (!isCI) {
  const input = await fs.readFile("input/day3.txt", { encoding: "utf8" });
  const puzzle = new Day3(input);
  console.log("Part 1: ", await puzzle.part1());
  console.log("Part 2: ", await puzzle.part2());
}
