class Dom {
  constructor(selector) {
    this.$el = createEl(selector);
  }

  append(el) {
    this.$el.append(el);
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
