import {DomListener} from './DomListener';

export class Component extends DomListener {
  constructor($root, options) {
    super($root, options);
    this.observer = options.observer;

    this.prepare();
  }

  prepare() {}

  init() {
    this.initHtmlListeners();
  }

  destroy() {
    this.removeHtmlListeners();
  }

  toHTML() {
    throw new Error('This method has to be rewritten');
  }

  on(eventType, listener) {
    this.observer.on(eventType, listener);
  }

  off(eventType, listener) {
    this.observer.off(eventType, listener);
  }

  emit(eventType, data) {
    this.observer.emit(eventType, data);
  }
}
