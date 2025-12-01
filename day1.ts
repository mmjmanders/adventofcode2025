import * as fs from "node:fs/promises";
import isCI from "is-ci";

export class Day1 {
  private mod(num: number, modulus: number) {
    return ((num % modulus) + modulus) % modulus;
  }

  async part1(input: string): Promise<number> {
    let solution = 0,
      pos = 50;

    const parsedInput = input
      .split(/\r?\n/)
      .map((x: string) =>
        x[0] === "L" ? -Number(x.slice(1)) : Number(x.slice(1)),
      );

    for (const move of parsedInput) {
      pos = this.mod(pos + move, 100);

      if (pos === 0) {
        solution++;
      }
    }

    return solution;
  }

  async part2(input: string): Promise<number> {
    let solution = 0,
      pos = 50;

    const parsedInput = input
      .split(/\r?\n/)
      .map((x: string) =>
        x[0] === "L" ? -Number(x.slice(1)) : Number(x.slice(1)),
      );

    for (const move of parsedInput) {
      const rotations = Math.abs(Math.trunc(move / 100));
      const rest = move % 100;

      const sum = pos + rest;

      if (rest !== 0 && pos !== 0 && (sum <= 0 || sum >= 100)) {
        solution++;
      }

      solution += rotations;
      pos = this.mod(pos + move, 100);
    }

    return solution;
  }
}

const solve = async (input: string) => {
  const puzzle = new Day1();
  console.log("Part 1: ", await puzzle.part1(input));
  console.log("Part 2: ", await puzzle.part2(input));
};

if (!isCI) {
  const input = await fs.readFile("input/day1.txt", { encoding: "utf8" });
  await solve(input);
}
