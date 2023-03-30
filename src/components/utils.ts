/**
 * Syncs the items with the elements in DOM.
 */
export function syncItemsWithElements(
  root: HTMLElement,
  elementCreator: (item: string) => HTMLElement,
  items: string[],
  elements: Map<string, HTMLElement>
) {
  const itemsKeys = items.map((item, index) => `${item}/${index}`);

  elements.forEach((element, charKey) => {
    if (!itemsKeys.includes(charKey)) {
      element.remove();
      elements.delete(charKey);
    }
  });

  itemsKeys.forEach((charKey, index) => {
    if (!elements.has(charKey)) {
      elements.set(charKey, elementCreator(items[index]));
    }
  });

  itemsKeys.forEach((charKey) => {
    root.appendChild(elements.get(charKey)!);
  });
}
