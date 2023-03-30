import {
  subscribe,
  handleUserInput,
  saveState,
  startGame,
  setPrevWordView,
  setNextWordView,
  selectIsGameDone,
  selectIsViewerMode,
} from "./store/index.ts";

/**
 * Main App component
 */
export class App extends HTMLElement {
  #unsubscribe: () => void = null!;

  connectedCallback() {
    // Handle first mount
    if (!this.children.length) {
      startGame("Do you want to continue the game?");
      this.appendChild(this.#createMarkup());
    }

    // Handle store changes
    this.#unsubscribe = subscribe(() => {
      // Show results if game is done
      if (selectIsGameDone()) {
        window.removeEventListener("keydown", this.#onKeyDown);
        window.removeEventListener("beforeunload", this.#onBeforeUnload);
        this.children[0].remove();
        this.appendChild(this.#showResults());
      }
    });

    window.addEventListener("keydown", this.#onKeyDown);
    window.addEventListener("beforeunload", this.#onBeforeUnload);
  }

  disconnectedCallback() {
    this.#unsubscribe();
    window.removeEventListener("keydown", this.#onKeyDown);
    window.removeEventListener("beforeunload", this.#onBeforeUnload);
  }

  /**
   * Create initial game screen
   */
  #createMarkup() {
    return document.createElement("game-block");
  }

  /**
   * Create results game screen
   */
  #showResults() {
    return document.createElement("game-results");
  }

  /**
   * Handle keyboard events
   */
  #onKeyDown(event: KeyboardEvent) {
    if (
      /^[a-z]$/i.test(event.key) &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey
    ) {
      if (!selectIsViewerMode()) {
        // Handle letters from keyboard
        handleUserInput(event.key);
      }
    } else if (event.key === "ArrowLeft") {
      // Handle done words navigation
      setPrevWordView();
    } else if (event.key === "ArrowRight") {
      // Handle done words navigation
      setNextWordView();
    }
  }

  /**
   * Save game state before page reload
   */
  #onBeforeUnload(event: BeforeUnloadEvent) {
    // required for Chrome
    event.returnValue = "";
    saveState();
  }
}

customElements.define("game-app", App);
