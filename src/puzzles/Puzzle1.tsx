import { useLayoutEffect, useRef } from 'react'

/**
 * Puzzle 1
 *
 * The message starts as "Hello World". Before the page is shown, it is
 * replaced with `message`. This puzzle is solved when the message reads
 * "Hello World" on load.
 *
 * Leave `data-puzzle-output` on the message element.
 */
const message = 'Oh, Hi Weld'

export function Puzzle1() {
  const outputRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const output = outputRef.current
    if (!output) return
    output.textContent = message
  }, [])

  return (
    <div ref={outputRef} data-puzzle-output>
      Hello World
    </div>
  )
}
