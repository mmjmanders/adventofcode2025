import { Day1 } from "./day1.ts";
import type { Puzzle } from "./types.ts";

describe("day1", () => {
  let puzzle: Puzzle;

  beforeEach(() => {
    puzzle = new Day1(`L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`);
  });

  it("part one should return 3", async () => {
    const solution = await puzzle.part1();
    expect(solution).toBe(3);
  });

  it("part two should return 6", async () => {
    const solution = await puzzle.part2();
    expect(solution).toBe(6);
  });
});
