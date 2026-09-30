import { useSyncExternalStore } from 'react';
import { puzzles, unlockedIds } from '../puzzles/registry.ts';

const STORAGE_KEY = 'whatcanyado.progress';

type StoredProgress = {
  solvedIds: number[];
  unlockedIds: number[];
};

const knownIds = new Set(puzzles.map((puzzle) => puzzle.id));

let solvedIds = readSolvedIds();

const listeners = new Set<() => void>();

function readSolvedIds(): number[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !('solvedIds' in parsed)) return [];
    const ids = (parsed as { solvedIds: unknown }).solvedIds;
    if (!Array.isArray(ids)) return [];
    return ids.filter((id): id is number => typeof id === 'number' && knownIds.has(id));
  } catch {
    return [];
  }
}

function writeProgress(ids: readonly number[]) {
  if (typeof localStorage === 'undefined') return;
  const payload: StoredProgress = {
    solvedIds: [...ids],
    unlockedIds: unlockedIds(ids)
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // A full or blocked browser cache should not take the puzzles down.
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): readonly number[] {
  return solvedIds;
}

export function markPuzzleSolved(puzzleId: number) {
  if (!knownIds.has(puzzleId) || solvedIds.includes(puzzleId)) return;
  solvedIds = [...solvedIds, puzzleId];
  writeProgress(solvedIds);
  emit();
}

export function useSolvedIds(): readonly number[] {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

if (typeof window !== 'undefined') {
  if (localStorage.getItem(STORAGE_KEY) === null) writeProgress(solvedIds);
  window.addEventListener('storage', () => {
    solvedIds = readSolvedIds();
    emit();
  });
}
