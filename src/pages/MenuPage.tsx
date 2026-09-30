import { Link } from 'react-router-dom'
import { useSolvedIds } from '../progress/progress.ts'
import { puzzles, unlockedIds } from '../puzzles/registry.ts'

export function MenuPage() {
  const solvedIds = useSolvedIds()
  const unlocked = new Set(unlockedIds(solvedIds))

  return (
    <>
      <h1>Menu</h1>
      <p>Open any unlocked puzzle. Solving one unlocks the next.</p>
      <ol>
        {puzzles.map((puzzle) => {
          const isUnlocked = unlocked.has(puzzle.id)
          const isSolved = solvedIds.includes(puzzle.id)
          return (
            <li key={puzzle.id}>
              <p>
                {isUnlocked ? (
                  <Link to={`/puzzles/${puzzle.id}`}>{puzzle.title}</Link>
                ) : (
                  puzzle.title
                )}{' '}
                {isSolved ? <mark>Solved</mark> : <small>{isUnlocked ? 'Unlocked' : 'Locked'}</small>}
              </p>
              <p>
                <small>{puzzle.summary}</small>
              </p>
              <p>
                <small>
                  <code>{puzzle.file}</code>
                </small>
              </p>
            </li>
          )
        })}
      </ol>
    </>
  )
}
