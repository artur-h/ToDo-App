export class Observer {
  constructor() {
    this.listeners = {};
  }

  on(eventType, listener) {
    if (!this.listeners[eventType]) this.listeners[eventType] = [];

    this.listeners[eventType].push(listener);
  }

  emit(eventType, data) {
    this.listeners[eventType].forEach(callback => callback(data));
  }

  off(eventType, listener) {
    this.listeners[eventType] = this.listeners[eventType].filter(callback => {
      return callback !== listener;
    });
  }

  destroy() {
    this.listeners = {};
  }
}
