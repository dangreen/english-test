import { selectResults, state } from "../store/index.ts";

/**
 * Game Results component
 */
export class Results extends HTMLElement {
  connectedCallback() {
    if (!this.children.length) {
      this.appendChild(this.#createMarkup());
    }
  }

  #createMarkup() {
    const root = document.createElement("div");
    const { correctWords, mistakesCount, maxMistakesWordIndex } =
      selectResults();

    root.innerHTML =
      `<p class="lead mb-1">Game Results</p>` +
      `<dl>` +
      `<dt>Words without mistakes:</dt>` +
      `<dd>${correctWords}</dd>` +
      `<dt>Mistakes count:</dt>` +
      `<dd>${mistakesCount}</dd>` +
      (maxMistakesWordIndex > -1
        ? `<dt>Word with max mistakes:</dt>` +
          `<dd>${state.words[maxMistakesWordIndex]}</dd>`
        : "") +
      `</dl>`;

    return root;
  }
}

customElements.define("game-results", Results);
