import { useRef, useState, type ChangeEvent } from 'react';

/**
 * Puzzle 6
 *
 * The message starts as "Click below to replace me". The button runs
 * `replaceMessage`, which writes a new message. `amount` is tied to the
 * number input and cannot go above 5. This puzzle is solved when the
 * message reads "Hello World" after the button is clicked.
 *
 * Leave `data-puzzle-output` on the message element.
 */
const helloWorld = 'Hello World';

export function Puzzle6() {
  const outputRef = useRef<HTMLDivElement>(null);
  const [amount, setAmount] = useState(5);

  function replaceMessage() {
    const output = outputRef.current;
    if (!output) return;

    output.textContent = '';
    for (let i = 0; i < amount && i + 1 < helloWorld.length; i += 2) {
      output.textContent += helloWorld[i] + helloWorld[i + 1];
    }
  }

  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.valueAsNumber;
    setAmount(Number.isNaN(next) ? 0 : Math.min(next, 10));
  }

  return (
    <>
      <div ref={outputRef} data-puzzle-output>
        Click below to replace me
      </div>
      <button type="button" onClick={replaceMessage}>
        Replace
      </button>
      <label>
        Number
        <input type="number" min={0} max={10} value={amount} onChange={handleAmountChange} />
      </label>
    </>
  );
}
