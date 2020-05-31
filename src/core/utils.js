export function toEventHandler(string) {
  return 'on' + string[0].toUpperCase() + string.slice(1);
}
