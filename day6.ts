import isCI from "is-ci";
import fs from "node:fs/promises";
import { Puzzle } from "./types.ts";

type Op = "+" | "-" | "*" | "/";

export class Day6 extends Puzzle {
  private applyOp(op: Op, a: number, b: number): number {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        if (b === 0) throw new Error("Division by zero");
        // integer division (truncate toward zero)
        return a / b;
    }
  }

  private grandTotalFromWorksheet(rows: string[]): number {
    if (rows.length === 0) return 0;

    const height = rows.length;
    const width = Math.max(...rows.map((r) => r.length));
    // pad rows to equal width with spaces
    const padded = rows.map((r) => r.padEnd(width, " "));

    // Build column strings (top-to-bottom)
    const colStrs: string[] = Array.from({ length: width }, (_, c) =>
      padded.map((r) => r[c]).join(""),
    );

    // Determine segments: contiguous columns that are not all spaces
    const segments: Array<{ start: number; end: number }> = [];
    let j = 0;
    while (j < width) {
      // column is empty if every char is space
      const isEmpty = (idx: number) => colStrs[idx]!.trim().length === 0;
      if (isEmpty(j)) {
        j++;
        continue;
      }
      const start = j;
      while (j < width && !isEmpty(j)) j++;
      const end = j - 1;
      segments.push({ start, end });
    }

    // For each segment (problem) parse operator and numbers, evaluate
    let grandTotal = 0;

    for (const seg of segments) {
      // find operator: a non-space char in the bottom row within the segment
      let opChar: string | null = null;
      let opColIndex = -1;
      for (let c = seg.start; c <= seg.end; c++) {
        const ch = padded[height - 1]![c]!;
        if (ch !== " ") {
          opChar = ch;
          opColIndex = c;
          break;
        }
      }
      if (opChar === null) {
        throw new Error(
          `No operator found in bottom row for segment ${seg.start}-${seg.end}`,
        );
      }
      if (!["+", "-", "*", "/"].includes(opChar)) {
        throw new Error(
          `Unsupported operator '${opChar}' in segment ${seg.start}-${seg.end}`,
        );
      }
      const op = opChar as Op;

      // gather columns for this problem in left->right order
      const cols = [];
      for (let c = seg.start; c <= seg.end; c++) cols.push(c);

      // The numbers are the columns read RIGHT-to-LEFT (per cephalopod rules).
      const numbers: number[] = [];
      for (let k = cols.length - 1; k >= 0; k--) {
        const c = cols[k];
        // read rows 0..height-2 (exclude bottom operator row)
        const digits = [];
        for (let r = 0; r < height - 1; r++) {
          const ch = padded[r]![c!]!;
          if (ch !== " ") digits.push(ch);
        }
        // join digits top to bottom; if empty column (unlikely) treat as 0
        const numStr = digits.join("").trim();
        const value = numStr.length === 0 ? 0 : Number(numStr);
        numbers.push(value);
      }

      if (numbers.length === 0) continue;

      // Evaluate by folding left-to-right: (((n0 op n1) op n2) ...)
      let acc = numbers[0]!;
      for (let i = 1; i < numbers.length; i++) {
        acc = this.applyOp(op, acc, numbers[i]!);
      }

      grandTotal += acc;
    }

    return grandTotal;
  }

  async part1(): Promise<string | number> {
    let total = 0;
    const parsedInput = this.input
      .split(/\r?\n/)
      .map((line, i, arr) =>
        i === arr.length - 1
          ? line.trim().split(/\s+/)
          : line.trim().split(/\s+/).map(Number),
      );
    for (let i = 0; i < parsedInput[0]!.length; i++) {
      let sumString = [];
      for (let j = 0; j < parsedInput!.length - 1; j++) {
        sumString.push(parsedInput[j]![i]!.toString());
      }
      total += Number(
        eval(
          sumString.join(parsedInput[parsedInput.length - 1]![i]!.toString()),
        ),
      );
    }
    return total;
  }

  async part2(): Promise<string | number> {
    return this.grandTotalFromWorksheet(this.input.split(/\r?\n/));
  }
}

if (!isCI) {
  const input = await fs.readFile("input/day6.txt", { encoding: "utf8" });
  const puzzle = new Day6(input);
  console.log("Part 1: ", await puzzle.part1());
  console.log("Part 2: ", await puzzle.part2());
}
