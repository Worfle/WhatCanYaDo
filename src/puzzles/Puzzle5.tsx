import { useRef } from 'react';

/**
 * Puzzle 5
 *
 * The message starts as "Click below to replace me". The button runs
 * `replaceMessage`, which writes a new message. This puzzle is solved
 * when the message reads "Hello World" after the button is clicked.
 *
 * Leave `data-puzzle-output` on the message element.
 */
export function Puzzle5() {
  const outputRef = useRef<HTMLDivElement>(null);

  function replaceMessage() {
    const output = outputRef.current;
    if (!output) return;
    output.textContent = 'Not quite';
  }

  return (
    <>
      <div ref={outputRef} data-puzzle-output>
        Click below to replace me
      </div>
      <button type="button" onClick={replaceMessage}>
        Replace
      </button>
    </>
  );
}
