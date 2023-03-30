import type { Button } from "../components/Button.ts";
import { syncItemsWithElements } from "../components/utils.ts";
import {
  state,
  subscribe,
  handleUserInput,
  selectIsCorrectNextChar,
  selectIsViewerMode,
} from "../store/index.ts";

/**
 * Game Letters component
 */
export class GameLetters extends HTMLElement {
  #charButtons = new Map<string, Button>();
  #rootElement: HTMLElement = null!;
  #unsubscribe: () => void = null!;

  connectedCallback() {
    // Handle first mount
    if (!this.children.length) {
      this.#rootElement = this.#createMarkup();
      this.appendChild(this.#rootElement);
    }

    // Set initial values
    this.#setCharButtons();
    // Handle store changes
    this.#unsubscribe = subscribe(() => {
      this.#setCharButtons();
    });
  }

  disconnectedCallback() {
    this.#unsubscribe();
  }

  /**
   * Create root element
   */
  #createMarkup() {
    return document.createElement("div");
  }

  /**
   * Create button element with char
   */
  #createButton(char: string) {
    const button = document.createElement("button", {
      is: "game-button",
    }) as Button;

    button.style.margin = "4px";
    button.textContent = char;
    button.onclick = this.#onButtonClick.bind(this, button, char);

    return button;
  }

  /**
   * Handle button click
   */
  #onButtonClick(button: Button, char: string) {
    // Highlight button if char is incorrect
    if (!selectIsCorrectNextChar(char)) {
      button.blink("danger");
    }

    handleUserInput(char);
  }

  #setCharButtons() {
    if (selectIsViewerMode()) {
      // Hide buttons if viewer mode is on
      this.#rootElement.style.display = "none";
    } else {
      this.#rootElement.style.display = "block";
      syncItemsWithElements(
        this.#rootElement,
        this.#createButton.bind(this),
        state.currentWordShuffledChars,
        this.#charButtons
      );
    }
  }
}

customElements.define("game-letters", GameLetters);
