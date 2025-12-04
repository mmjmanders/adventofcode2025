import { Day4 } from "./day4.ts";
import type { Puzzle } from "./types.ts";

describe("day4", () => {
  let puzzle: Puzzle;

  beforeEach(() => {
    puzzle = new Day4(
      `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`,
    );
  });

  it("part one should return 13", async () => {
    const solution = await puzzle.part1();
    expect(solution).toBe(13);
  });

  it("part two should return 43", async () => {
    const solution = await puzzle.part2();
    expect(solution).toBe(43);
  });
});
