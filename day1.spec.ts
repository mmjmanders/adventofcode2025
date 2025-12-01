import { Day1 } from "./day1.ts";

describe("day1", () => {
  const input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;
  let puzzle: Day1;

  beforeEach(() => {
    puzzle = new Day1();
  });

  it("part one should return 3", async () => {
    const solution = await puzzle.part1(input);
    expect(solution).toBe(3);
  });

  it("part two should return 6", async () => {
    const solution = await puzzle.part2(input);
    expect(solution).toBe(6);
  });
});
