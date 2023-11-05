export function validateString(str:any) {
  // Check if the input is a non-empty string (ignores spaces)
  return typeof str === 'string' && str.trim() !== '';
}
