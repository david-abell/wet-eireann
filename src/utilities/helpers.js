export function removeEmptyValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value != null)
  );
}
export function checkValues(obj) {
  return Object.entries(obj).every(([_, value]) => !!value !== false);
}

export function chunkArray(array = [], chunkSize) {
  return array.length
    ? [
        array.slice(0, chunkSize),
        ...chunkArray(array.slice(chunkSize), chunkSize),
      ]
    : [];
}
