import type { ComponentType } from 'react'
import { Puzzle1 } from './Puzzle1.tsx'
import { Puzzle2 } from './Puzzle2.tsx'

/** Text the message element must show for a puzzle to count as solved. */
export const SOLVED_TEXT = 'Hello World'

export type SolveWhen = 'load' | 'change'

export type PuzzleDefinition = {
  id: number
  title: string
  summary: string
  file: string
  solveWhen: SolveWhen
  Component: ComponentType
}

export const puzzles: readonly PuzzleDefinition[] = [
  {
    id: 1,
    title: 'Puzzle 1',
    summary: 'When the page loads, the message should read Hello World.',
    file: 'src/puzzles/Puzzle1.tsx',
    solveWhen: 'load',
    Component: Puzzle1,
  },
  {
    id: 2,
    title: 'Puzzle 2',
    summary: 'After the input changes, the message should read Hello World.',
    file: 'src/puzzles/Puzzle2.tsx',
    solveWhen: 'change',
    Component: Puzzle2,
  },
]

export function findPuzzle(id: number): PuzzleDefinition | undefined {
  return puzzles.find((puzzle) => puzzle.id === id)
}

export function nextPuzzle(id: number): PuzzleDefinition | undefined {
  const index = puzzles.findIndex((puzzle) => puzzle.id === id)
  if (index < 0) return undefined
  return puzzles[index + 1]
}

/** Puzzle 1 is always unlocked. Each later puzzle unlocks when the previous one is solved. */
export function unlockedIds(solvedIds: readonly number[]): number[] {
  const unlocked: number[] = []
  for (let index = 0; index < puzzles.length; index += 1) {
    const puzzle = puzzles[index]
    const previous = index === 0 ? undefined : puzzles[index - 1]
    if (index === 0 || (previous && solvedIds.includes(previous.id))) {
      unlocked.push(puzzle.id)
      continue
    }
    break
  }
  return unlocked
}
