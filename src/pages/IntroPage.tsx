import { Link } from 'react-router-dom'

export function IntroPage() {
  return (
    <>
      <h1>WhatCanYaDo</h1>
      <p>
        Each puzzle page is a small TypeScript program with a bug. The page starts from a message
        that says Hello World, then that page&apos;s code changes it. Find the bug and fix it in
        that page&apos;s TypeScript.
      </p>
      <p>A puzzle is solved when its message element shows exactly Hello World, under that puzzle&apos;s rule:</p>
      <ul>
        <li>Puzzle 1 is solved when the message already says Hello World as the page loads.</li>
        <li>Puzzle 2 is solved when the message says Hello World after the input changes.</li>
      </ul>
      <p>
        The first puzzle is unlocked. Solving a puzzle unlocks the next one. Progress is saved in
        this browser, so reloading the page or opening the app again keeps the puzzles you have
        unlocked.
      </p>
      <p>
        <Link to="/menu">Go to the menu</Link>
      </p>
    </>
  )
}
