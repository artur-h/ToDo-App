import {toEventHandler} from '@core/utils';

export class DomListener {
  constructor($root, options) {
    this.$root = $root;
    this.name = options.name;
    this.listeners = options.listeners || [];
  }

  initHtmlListeners() {
    this.listeners.forEach(listener => {
      const handler = toEventHandler(listener);

      if (this[handler] === undefined) {
        throw new Error(`
          Handler "${handler}" is not implemented in component "${this.name}".
        `);
      }

      this[handler] = this[handler].bind(this);
      this.$root.on(listener, this[handler]);
    });
  }

  removeHtmlListeners() {
    this.listeners.forEach(listener => {
      const handler = toEventHandler(listener);
      this.$root.off(listener, this[handler]);
    });
  }
}
