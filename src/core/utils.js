export function toEventHandler(string) {
  return 'on' + string[0].toUpperCase() + string.slice(1);
}

export function setEndOfContenteditable(contentEditableElement) {
  const range = document.createRange();
  range.selectNodeContents(contentEditableElement);
  range.collapse(false);

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}
