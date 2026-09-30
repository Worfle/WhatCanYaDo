import { NavLink, Route, Routes } from 'react-router-dom';
import { IntroPage } from './pages/IntroPage.tsx';
import { MenuPage } from './pages/MenuPage.tsx';
import { PuzzlePage } from './pages/PuzzlePage.tsx';

export default function App() {
  return (
    <>
      <header className="container">
        <nav>
          <ul>
            <li>
              <strong>WhatCanYaDo</strong>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink to="/" end>
                Intro
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu">Menu</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/puzzles/:puzzleId" element={<PuzzlePage />} />
          <Route path="*" element={<IntroPage />} />
        </Routes>
      </main>
    </>
  );
}
