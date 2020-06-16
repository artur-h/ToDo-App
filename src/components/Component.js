import {DomListener} from './DomListener';

export class Component extends DomListener {
  constructor($root, options) {
    super($root, options);
    this.observer = options.observer;
    this.store = options.store;
    this.subscribe = options.subscribe;

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
    throw new Error('toHTML method has to be rewritten');
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

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  storeChanged() {
    throw new Error('storeChanged method has to be rewritten');
  }

  dispatch(action) {
    this.store.dispatch(action);
  }
}
