import {DomListener} from './DomListener';

export class Component extends DomListener {
  constructor($root, options) {
    super($root, options);

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
}
