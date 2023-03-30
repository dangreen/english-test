import { shuffle, removeItem } from "./utils.ts";
import { state } from "./state.ts";
import {
  selectIsCorrectNextChar,
  selectWordIsDoneCorrect,
  selectWordIsDoneIncorrect,
  selectGameIsSaved,
  selectGameIsStarted,
} from "./selectors.ts";
import { update } from "./subscription.ts";

export function setNextWord() {
  state.currentWordIndex++;

  if (state.currentWordIndex >= state.words.length) {
    update();
    return;
  }

  state.currentWordChars = state.words[state.currentWordIndex].split("");
  state.currentWordShuffledChars = shuffle(state.currentWordChars);
  state.currentWordUserInputChars = [];
  state.results[state.currentWordIndex] = 0;

  update();
}

export function addUserInputChar(char: string) {
  const isCorrect = selectIsCorrectNextChar(char);

  if (isCorrect) {
    state.currentWordUserInputChars.push(char);
    state.currentWordShuffledChars = removeItem(
      state.currentWordShuffledChars,
      char
    );
  } else {
    state.results[state.currentWordIndex]++;
  }

  update();
}

export function setCorrectWord() {
  state.currentWordUserInputChars = state.currentWordChars;
  state.currentWordShuffledChars = [];

  update();
}

export function handleUserInput(char: string) {
  addUserInputChar(char);

  if (selectWordIsDoneCorrect()) {
    setNextWord();
  }

  if (selectWordIsDoneIncorrect()) {
    setCorrectWord();
    setTimeout(setNextWord, 1000);
  }
}

export function saveState() {
  if (selectGameIsStarted()) {
    localStorage.setItem("gameState", JSON.stringify(state));
  }
}

export function loadState() {
  const savedState = localStorage.getItem("gameState");

  if (savedState) {
    try {
      Object.assign(state, JSON.parse(savedState));
    } catch (err) {
      // silent
    }
  }

  resetState();
  update();
}

export function resetState() {
  localStorage.removeItem("gameState");
}

/**
 * @param continueMessage - Message to show when user wants to continue the game after page reload
 */
export function startGame(continueMessage: string) {
  if (selectGameIsSaved() && confirm(continueMessage)) {
    loadState();
  } else {
    resetState();
    setNextWord();
  }
}

export function setNextWordView() {
  if (state.viewerIndex !== -1) {
    state.viewerIndex++;

    if (state.viewerIndex === state.currentWordIndex) {
      state.viewerIndex = -1;
    }

    update();
  }
}

export function setPrevWordView() {
  if (state.viewerIndex === -1) {
    state.viewerIndex = state.currentWordIndex;
  }

  state.viewerIndex--;

  if (state.viewerIndex < 0) {
    state.viewerIndex = 0;
  }

  update();
}
