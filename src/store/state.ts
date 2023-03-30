import { shuffle } from "./utils.ts";

const ALL_WORDS = [
  "apple",
  "function",
  "timeout",
  "task",
  "application",
  "data",
  "tragedy",
  "sun",
  "symbol",
  "button",
  "software",
];

const GAME_WORDS_COUNT = 6;

function getGameWords() {
  return shuffle(ALL_WORDS).slice(0, GAME_WORDS_COUNT);
}

function createInitialResults() {
  return Array.from({ length: GAME_WORDS_COUNT }, () => -1);
}

export interface State {
  currentWordIndex: number;
  currentWordChars: string[];
  currentWordShuffledChars: string[];
  currentWordUserInputChars: string[];
  /**
   * Words to play game
   */
  words: string[];
  /**
   * Results of each word
   * -1 - not started
   * 0 - correct
   * > 0 - mistakes count
   */
  results: number[];
  /**
   * Index of word to show in viewer
   */
  viewerIndex: number;
}

export function createState(): State {
  return {
    currentWordIndex: -1,
    currentWordChars: [],
    currentWordShuffledChars: [],
    currentWordUserInputChars: [],
    words: getGameWords(),
    results: createInitialResults(),
    viewerIndex: -1,
  };
}

/**
 * Store state
 */
export const state = createState();
