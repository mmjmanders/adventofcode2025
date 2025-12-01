export abstract class Puzzle {
  constructor(protected input: string) {}

  abstract part1(): Promise<string | number>;
  abstract part2(): Promise<string | number>;
}
