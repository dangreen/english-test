import type { Button } from "../components/Button.ts";
import { syncItemsWithElements } from "../components/utils.ts";
import {
  state,
  subscribe,
  selectWordIsDoneIncorrect,
  selectIsViewerMode,
  selectViewerWord,
  selectViewerWordIsIncorrect,
} from "../store/index.ts";

/**
 * Game Answer component
 */
export class GameAnswer extends HTMLElement {
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
    const root = document.createElement("div");

    root.className = "bg-light mx-1 mb-3";
    root.setAttribute("style", "height: 46px; border-radius: 6px");

    return root;
  }

  /**
   * Create button-like textbox element with char
   */
  #createButton(char: string) {
    const button = document.createElement("button", {
      is: "game-button",
    }) as Button;

    button.setAttribute("style", "margin: 4px");
    button.variant = "success";
    button.role = "textbox";
    button.textContent = char;

    return button;
  }

  #setCharButtons() {
    const isViewerMode = selectIsViewerMode();
    // Handle viewer mode
    const wordIsDoneIncorrect = isViewerMode
      ? selectViewerWordIsIncorrect()
      : selectWordIsDoneIncorrect();
    const buttonVariant = wordIsDoneIncorrect ? "danger" : "success";
    // Select chars to show
    const chars = isViewerMode
      ? selectViewerWord()
      : state.currentWordUserInputChars;

    syncItemsWithElements(
      this.#rootElement,
      this.#createButton.bind(this),
      chars,
      this.#charButtons
    );

    // Apply variant to all buttons
    this.#charButtons.forEach((button) => {
      button.variant = buttonVariant;
    });
  }
}

customElements.define("game-answer", GameAnswer);
