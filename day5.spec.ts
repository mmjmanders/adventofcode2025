import { Day5 } from "./day5.ts";
import type { Puzzle } from "./types.ts";

describe("day5", () => {
  let puzzle: Puzzle;

  beforeEach(() => {
    puzzle = new Day5(
      `3-5
10-14
16-20
12-18

1
5
8
11
17
32`,
    );
  });

  it("part one should return 3", async () => {
    const solution = await puzzle.part1();
    expect(solution).toBe(3);
  });

  it("part two should return 14", async () => {
    const solution = await puzzle.part2();
    expect(solution).toBe(14);
  });
});
