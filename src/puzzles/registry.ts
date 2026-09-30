import type { ComponentType } from 'react';
import { Puzzle1 } from './Puzzle1.tsx';
import { Puzzle2 } from './Puzzle2.tsx';
import { Puzzle3 } from './Puzzle3.tsx';
import { Puzzle4 } from './Puzzle4.tsx';
import { Puzzle5 } from './Puzzle5.tsx';
import { Puzzle6 } from './Puzzle6.tsx';

/** Text the message element must show for a puzzle to count as solved. */
export const SOLVED_TEXT = 'Hello World';

export type SolveWhen = 'load' | 'blur' | 'click';

export type PuzzleDefinition = {
  id: number;
  title: string;
  summary: string;
  file: string;
  solveWhen: SolveWhen;
  Component: ComponentType;
};

export const puzzles: readonly PuzzleDefinition[] = [
  {
    id: 1,
    title: 'Puzzle 1',
    summary: 'When the page loads, the message should read Hello World.',
    file: 'src/puzzles/Puzzle1.tsx',
    solveWhen: 'load',
    Component: Puzzle1
  },
  {
    id: 2,
    title: 'Puzzle 2',
    summary: 'After the input blurs, the message should read Hello World.',
    file: 'src/puzzles/Puzzle2.tsx',
    solveWhen: 'blur',
    Component: Puzzle2
  },
  {
    id: 3,
    title: 'Puzzle 3',
    summary: 'After a radio button blurs, the message should read Hello World.',
    file: 'src/puzzles/Puzzle3.tsx',
    solveWhen: 'blur',
    Component: Puzzle3
  },
  {
    id: 4,
    title: 'Puzzle 4',
    summary: 'After a radio button blurs, the message should read Hello World.',
    file: 'src/puzzles/Puzzle4.tsx',
    solveWhen: 'blur',
    Component: Puzzle4
  },
  {
    id: 5,
    title: 'Puzzle 5',
    summary: 'After the button is clicked, the message should read Hello World.',
    file: 'src/puzzles/Puzzle5.tsx',
    solveWhen: 'click',
    Component: Puzzle5
  },
  {
    id: 6,
    title: 'Puzzle 6',
    summary: 'After the button is clicked, the message should read Hello World.',
    file: 'src/puzzles/Puzzle6.tsx',
    solveWhen: 'click',
    Component: Puzzle6
  }
];

export function findPuzzle(id: number): PuzzleDefinition | undefined {
  return puzzles.find((puzzle) => puzzle.id === id);
}

export function nextPuzzle(id: number): PuzzleDefinition | undefined {
  const index = puzzles.findIndex((puzzle) => puzzle.id === id);
  if (index < 0) return undefined;
  return puzzles[index + 1];
}

/** Puzzle 1 is always unlocked. Each later puzzle unlocks when the previous one is solved. */
export function unlockedIds(solvedIds: readonly number[]): number[] {
  const unlocked: number[] = [];
  for (let index = 0; index < puzzles.length; index += 1) {
    const puzzle = puzzles[index];
    const previous = index === 0 ? undefined : puzzles[index - 1];
    if (index === 0 || (previous && solvedIds.includes(previous.id))) {
      unlocked.push(puzzle.id);
      continue;
    }
    break;
  }
  return unlocked;
}
