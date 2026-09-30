import { useLayoutEffect, useRef, useState, type ChangeEvent } from 'react';

/**
 * Puzzle 4
 *
 * The message starts as "Hello World", then the chosen entries replace it
 * before the page is shown. Each radio group is tied to its own selector.
 * The message is the first selection, a space, then the second selection.
 * This puzzle is solved when the message reads "Hello World" after a
 * radio button blurs.
 *
 * Leave `data-puzzle-output` on the message element.
 */
const firstWords = ['Wonderful', 'Blue Cat', 'John', 'World'];
const secondWords = ['Neon Dog', 'Justin', 'Inkling', 'Catfood'];

export function Puzzle4() {
  const outputRef = useRef<HTMLDivElement>(null);
  const [firstSelector, setFirstSelector] = useState(0);
  const [secondSelector, setSecondSelector] = useState(0);

  useLayoutEffect(() => {
    const output = outputRef.current;
    if (!output) return;
    output.textContent = `${firstWords[firstSelector]} ${secondWords[secondSelector]}`;
  }, [firstSelector, secondSelector]);

  function handleFirstChange(event: ChangeEvent<HTMLInputElement>) {
    setFirstSelector(Number(event.target.value));
  }

  function handleSecondChange(event: ChangeEvent<HTMLInputElement>) {
    setSecondSelector(Number(event.target.value));
  }

  return (
    <>
      <div ref={outputRef} data-puzzle-output>
        Hello World
      </div>
      <fieldset>
        <legend>First</legend>
        <label>
          <input
            type="radio"
            name="firstSelector"
            value={0}
            checked={firstSelector === 0}
            onChange={handleFirstChange}
          />
          0
        </label>
        <label>
          <input
            type="radio"
            name="firstSelector"
            value={1}
            checked={firstSelector === 1}
            onChange={handleFirstChange}
          />
          1
        </label>
        <label>
          <input
            type="radio"
            name="firstSelector"
            value={2}
            checked={firstSelector === 2}
            onChange={handleFirstChange}
          />
          2
        </label>
        <label>
          <input
            type="radio"
            name="firstSelector"
            value={3}
            checked={firstSelector === 3}
            onChange={handleFirstChange}
          />
          3
        </label>
      </fieldset>
      <fieldset>
        <legend>Second</legend>
        <label>
          <input
            type="radio"
            name="secondSelector"
            value={0}
            checked={secondSelector === 0}
            onChange={handleSecondChange}
          />
          0
        </label>
        <label>
          <input
            type="radio"
            name="secondSelector"
            value={1}
            checked={secondSelector === 1}
            onChange={handleSecondChange}
          />
          1
        </label>
        <label>
          <input
            type="radio"
            name="secondSelector"
            value={2}
            checked={secondSelector === 2}
            onChange={handleSecondChange}
          />
          2
        </label>
        <label>
          <input
            type="radio"
            name="secondSelector"
            value={3}
            checked={secondSelector === 3}
            onChange={handleSecondChange}
          />
          3
        </label>
      </fieldset>
    </>
  );
}
