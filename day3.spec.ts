import { Day3 } from "./day3.ts";
import type { Puzzle } from "./types.ts";

describe("day3", () => {
  let puzzle: Puzzle;

  beforeEach(() => {
    puzzle = new Day3(
      `987654321111111
811111111111119
234234234234278
818181911112111`,
    );
  });

  it("part one should return 357", async () => {
    const solution = await puzzle.part1();
    expect(solution).toBe(357);
  });

  it("part two should return 3121910778619", async () => {
    const solution = await puzzle.part2();
    expect(solution).toBe(3121910778619);
  });
});
