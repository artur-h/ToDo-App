class Dom {
  constructor(selector) {
    this.$el = createEl(selector);
  }

  get outer() {
    return this.$el.outerHTML;
  }

  append(element) {
    if (typeof element === 'string') {
      this.$el.insertAdjacentHTML('beforeend', element);
      return this;
    }

    this.$el.append(element);
    return this;
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
