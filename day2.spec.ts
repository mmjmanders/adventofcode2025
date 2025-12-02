import { Day2 } from "./day2.ts";
import type { Puzzle } from "./types.ts";

describe("day2", () => {
  let puzzle: Puzzle;

  beforeEach(() => {
    puzzle = new Day2(
      `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
    );
  });

  it("part one should return 1227775554", async () => {
    const solution = await puzzle.part1();
    expect(solution).toBe(1227775554);
  });

  it("part two should return 4174379265", async () => {
    const solution = await puzzle.part2();
    expect(solution).toBe(4174379265);
  });
});
