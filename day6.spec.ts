import { Day6 } from "./day6.ts";
import type { Puzzle } from "./types.ts";

describe("day6", () => {
  let puzzle: Puzzle;

  beforeEach(() => {
    puzzle = new Day6(
      `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +`,
    );
  });

  it("part one should return 4277556", async () => {
    const solution = await puzzle.part1();
    expect(solution).toBe(4277556);
  });

  it("part two should return 3263827", async () => {
    const solution = await puzzle.part2();
    expect(solution).toBe(3263827);
  });
});
