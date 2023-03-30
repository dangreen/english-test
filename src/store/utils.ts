/**
 * Shuffles array in place
 */
export function shuffle<T extends unknown[]>(items: T) {
  return items.slice().sort(() => Math.random() - 0.5) as T;
}

/**
 * Removes item from array
 */
export function removeItem<T extends unknown[]>(
  items: T,
  itemToRemove: T[number]
) {
  const index = items.indexOf(itemToRemove);

  if (index !== -1) {
    return items.filter((_, i) => i !== index) as T;
  }

  return items;
}
