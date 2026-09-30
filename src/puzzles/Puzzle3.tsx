import { useLayoutEffect, useRef, useState, type ChangeEvent } from 'react';

/**
 * Puzzle 3
 *
 * The message starts as "Hello World", then the entry at `textSelector`
 * replaces it before the page is shown. The radio buttons are tied to
 * `textSelector`. This puzzle is solved when the message reads
 * "Hello World" after a radio button blurs.
 *
 * Leave `data-puzzle-output` on the message element.
 */
const messages = ['Goodbye World', 'Hello Sunshine', 'What is up?'];

export function Puzzle3() {
  const outputRef = useRef<HTMLDivElement>(null);
  const [textSelector, setTextSelector] = useState(0);

  useLayoutEffect(() => {
    const output = outputRef.current;
    if (!output) return;
    output.textContent = messages[textSelector];
  }, [textSelector]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setTextSelector(Number(event.target.value));
  }

  return (
    <>
      <div ref={outputRef} data-puzzle-output>
        Hello World
      </div>
      <fieldset>
        <legend>Message</legend>
        <label>
          <input type="radio" name="textSelector" value={0} checked={textSelector === 0} onChange={handleChange} />0
        </label>
        <label>
          <input type="radio" name="textSelector" value={1} checked={textSelector === 1} onChange={handleChange} />1
        </label>
        <label>
          <input type="radio" name="textSelector" value={2} checked={textSelector === 2} onChange={handleChange} />2
        </label>
      </fieldset>
    </>
  );
}
