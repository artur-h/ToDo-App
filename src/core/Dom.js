class Dom {
  constructor(selector) {
    this.$el = createEl(selector);
  }

  get outer() {
    return this.$el.outerHTML;
  }

  on(event, handler) {
    this.$el.addEventListener(event, handler);
  }

  closest(selector) {
    return this.$el.closest(selector);
  }

  find(selector) {
    return document.querySelector(selector);
  }

  off(event, handler) {
    this.$el.removeEventListener(event, handler);
  }

  html(content = null) {
    if (content === null) {
      return this.$el.innerHTML;
    }

    this.$el.innerHTML = content;
    return this;
  }

  append(element) {
    element instanceof Dom ?
      this.$el.append(element.$el) :
      this.$el.append(element);
  }

  before(element) {
    element instanceof Dom ?
      this.$el.before(element.$el) :
      this.$el.before(element);
  }

  get action() {
    return this.$el.dataset.action;
  }

  get parent() {
    return $(this.$el.parentNode);
  }

  removeChild(element) {
    element instanceof Dom ?
      this.$el.removeChild(element.$el) :
      this.$el.removeChild(element);
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => this.$el.style[key] = styles[key]);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = function(element, className) {
  const el = document.createElement(element);
  el.className = className;
  return $(el);
};

function createEl(selector) {
  if (typeof selector === 'string') {
    const element = document.querySelector(selector);

    if (!element) {
      throw new Error(`Can't find DOM element with such selector: ${selector}`);
    }

    return element;
  }

  return selector;
}
