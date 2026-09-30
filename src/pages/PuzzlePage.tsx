import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { markPuzzleSolved, useSolvedIds } from '../progress/progress.ts'
import { findPuzzle, nextPuzzle, SOLVED_TEXT, unlockedIds, type PuzzleDefinition } from '../puzzles/registry.ts'

function readMessage(root: ParentNode): string {
  const output = root.querySelector('[data-puzzle-output]')
  return (output?.textContent ?? '').replace(/\s+/g, ' ').trim()
}

export function PuzzlePage() {
  const { puzzleId } = useParams()
  const puzzle = findPuzzle(Number(puzzleId))
  const solvedIds = useSolvedIds()

  if (!puzzle) {
    return (
      <>
        <h1>Puzzle not found</h1>
        <p>
          <Link to="/menu">Back to the menu</Link>
        </p>
      </>
    )
  }

  const unlocked = unlockedIds(solvedIds).includes(puzzle.id)
  if (!unlocked) {
    return (
      <>
        <h1>{puzzle.title} is locked</h1>
        <p>Solve the previous puzzle to unlock this one.</p>
        <p>
          <Link to="/menu">Back to the menu</Link>
        </p>
      </>
    )
  }

  const upcoming = nextPuzzle(puzzle.id)
  const solved = solvedIds.includes(puzzle.id)

  return (
    <>
      <h1>{puzzle.title}</h1>
      <p>{puzzle.summary}</p>
      <p>
        <small>
          Edit <code>{puzzle.file}</code> and save. The page will update.
        </small>
      </p>
      {solved && (
        <p role="status">
          <mark>Solved</mark>{' '}
          {upcoming ? (
            <>
              <Link to={`/puzzles/${upcoming.id}`}>{upcoming.title}</Link> is unlocked.
            </>
          ) : (
            'That was the last puzzle.'
          )}
        </p>
      )}
      <PuzzleStage puzzle={puzzle} />
      <p>
        <Link to="/menu">Back to the menu</Link>
      </p>
    </>
  )
}

function PuzzleStage({ puzzle }: { puzzle: PuzzleDefinition }) {
  const rootRef = useRef<HTMLElement>(null)
  const Puzzle = puzzle.Component

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const solveIfReady = () => {
      if (readMessage(root) === SOLVED_TEXT) markPuzzleSolved(puzzle.id)
    }

    if (puzzle.solveWhen === 'load') {
      const observer = new MutationObserver(() => {
        solveIfReady()
      })
      observer.observe(root, { subtree: true, childList: true, characterData: true })
      solveIfReady()
      return () => observer.disconnect()
    }

    let sawChange = false
    const rememberChange = () => {
      sawChange = true
      queueMicrotask(solveIfReady)
      requestAnimationFrame(solveIfReady)
    }
    const observer = new MutationObserver(() => {
      if (sawChange) solveIfReady()
    })
    observer.observe(root, { subtree: true, childList: true, characterData: true })
    root.addEventListener('input', rememberChange)
    root.addEventListener('change', rememberChange)
    return () => {
      observer.disconnect()
      root.removeEventListener('input', rememberChange)
      root.removeEventListener('change', rememberChange)
    }
  }, [puzzle.id, puzzle.solveWhen])

  return (
    <section ref={rootRef}>
      <Puzzle />
    </section>
  )
}
