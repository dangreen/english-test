const target = new EventTarget();

/**
 * Subscribe to store updates
 */
export function subscribe(listener: () => void): () => void {
  target.addEventListener("update", listener);

  return () => target.removeEventListener("update", listener);
}

/**
 * Dispatch store update
 */
export function update() {
  setTimeout(() => {
    target.dispatchEvent(new CustomEvent("update"));
  }, 0);
}
