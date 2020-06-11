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

export function storage(key, value = null) {
  if (value) {
    localStorage.setItem(key, value);
  } else {
    localStorage.getItem(key);
  }
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  return a === b;
}
