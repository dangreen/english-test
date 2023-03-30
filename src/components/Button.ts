export type ButtonVariant = "primary" | "success" | "danger";

/**
 * Button component
 */
export class Button extends HTMLButtonElement {
  static get observedAttributes() {
    return ["variant"];
  }

  constructor() {
    super();

    this.#setStyle();
  }

  attributeChangedCallback(attributeName: string) {
    if (attributeName === "variant") {
      this.#setStyle();
    }
  }

  get variant(): ButtonVariant {
    return (this.getAttribute("variant") as ButtonVariant) || "primary";
  }

  set variant(value: ButtonVariant) {
    this.setAttribute("variant", value);
  }

  blink(variant: ButtonVariant, time = 300) {
    const defaultVariant = this.variant;

    this.variant = variant;

    setTimeout(() => {
      this.variant = defaultVariant;
    }, time);
  }

  #setStyle() {
    const variant = this.variant;

    this.className = `btn btn-${variant}`;
  }
}

customElements.define("game-button", Button, { extends: "button" });
