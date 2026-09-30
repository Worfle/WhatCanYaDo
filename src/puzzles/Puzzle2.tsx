import { useLayoutEffect, useRef, useState, type ChangeEvent } from 'react'

/**
 * Puzzle 2
 *
 * The message starts as "Hello World", then `initialMessage` replaces it
 * before the page is shown. The input is tied to that same message.
 * This puzzle is solved when the message reads "Hello World" after the
 * input changes.
 *
 * Leave `data-puzzle-output` on the message element.
 */
const initialMessage = 'Oh, Hi Weld'

export function Puzzle2() {
  const outputRef = useRef<HTMLDivElement>(null)
  const [message, setMessage] = useState(initialMessage)

  useLayoutEffect(() => {
    const output = outputRef.current
    if (!output) return
    output.textContent = message
  }, [message])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const entered = event.target.value
    setMessage(entered + '...I know you are, but what am I?')
  }

  return (
    <>
      <div ref={outputRef} data-puzzle-output>
        Hello World
      </div>
      <label>
        Message
        <input type="text" value={message} onChange={handleChange} autoComplete="off" />
      </label>
    </>
  )
}
