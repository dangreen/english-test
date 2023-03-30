import { state } from "./state.ts";

const MAX_MISTAKES = 3;

export function selectWordIsDoneCorrect() {
  return (
    state.currentWordChars.length === state.currentWordUserInputChars.length
  );
}

export function selectWordIsDoneIncorrect() {
  return state.results[state.currentWordIndex] >= MAX_MISTAKES;
}

export function selectIsCorrectNextChar(char: string) {
  const correctChar =
    state.currentWordChars[state.currentWordUserInputChars.length];
  const isCorrect = char === correctChar;

  return isCorrect;
}

export function selectResults() {
  return state.results.reduce(
    (data, result, index) => {
      data.mistakesCount += result;

      if (
        (data.maxMistakesWordIndex === -1 && result > 0) ||
        (data.maxMistakesWordIndex > -1 &&
          result > state.results[data.maxMistakesWordIndex])
      ) {
        data.maxMistakesWordIndex = index;
      }

      if (result === 0) {
        data.correctWords++;
      }

      return data;
    },
    {
      correctWords: 0,
      mistakesCount: 0,
      maxMistakesWordIndex: -1,
    }
  );
}

export function selectIsGameDone() {
  return state.currentWordIndex >= state.words.length;
}

export function selectGameIsSaved() {
  return Boolean(localStorage.getItem("gameState"));
}

export function selectGameIsStarted() {
  return (
    state.currentWordIndex > 0 || state.currentWordUserInputChars.length > 0
  );
}

export function selectIsViewerMode() {
  return state.viewerIndex > -1;
}

export function selectViewerWord() {
  return state.words[state.viewerIndex].split("");
}

export function selectViewerWordIsIncorrect() {
  return state.results[state.viewerIndex] >= MAX_MISTAKES;
}
