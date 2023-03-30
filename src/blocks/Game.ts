import { state, subscribe, selectIsViewerMode } from "../store/index.ts";

/**
 * Game component
 */
export class Game extends HTMLElement {
  #currentQuestionElement: HTMLElement = null!;
  #totalQuestionsElement: HTMLElement = null!;
  #unsubscribe: () => void = null!;

  connectedCallback() {
    // Handle first mount
    if (!this.children.length) {
      this.appendChild(this.#createMarkup());
      this.#currentQuestionElement = this.querySelector("#current_question")!;
      this.#totalQuestionsElement = this.querySelector("#total_questions")!;
    }

    // Set initial values
    this.#setTotalQuestionsCount();
    this.#setCurrentQuestionNumber();
    // Handle store changes
    this.#unsubscribe = subscribe(() => {
      this.#setCurrentQuestionNumber();
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

    root.innerHTML =
      `<p class="lead mb-1">Form a valid English word using the given letters</p>` +
      `<p class="mb-5">Question <span id="current_question"></span> of <span id="total_questions"></span></p>` +
      `<div>` +
      `<game-answer></game-answer>` +
      `<game-letters></game-letters>` +
      `</div>`;

    return root;
  }

  /**
   * Update total questions count
   */
  #setTotalQuestionsCount() {
    this.#totalQuestionsElement.textContent = state.words.length.toString();
  }

  /**
   * Update current question number
   */
  #setCurrentQuestionNumber() {
    const index = selectIsViewerMode()
      ? state.viewerIndex
      : state.currentWordIndex;

    this.#currentQuestionElement.textContent = String(index + 1);
  }
}

customElements.define("game-block", Game);
