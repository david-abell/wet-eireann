export function removeEmptyValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value != null)
  );
}
export function checkValues(obj) {
  return Object.entries(obj).every(([_, value]) => !!value !== false);
}
