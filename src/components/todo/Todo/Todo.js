import {$} from '@core/Dom';
import {Observer} from '@core/Observer';
import {StoreSubscriber} from '@core/state/StoreSubscriber';

export class Todo {
  constructor($root, components, store) {
    this.$root = $($root);
    this.components = components || [];
    this.instances = [];
    this.observer = new Observer();
    this.store = store;
    this.subscriber = new StoreSubscriber(store);
  }

  getRoot() {
    const todo = $.create('div', 'todo');

    const options = {
      observer: this.observer,
      store: this.store
    };

    this.instances = this.components.map(Component => {
      const rootWrapper = $.create('div', Component.className);
      const component = new Component(rootWrapper, options);
      rootWrapper.html(component.toHTML());
      todo.append(rootWrapper);

      return component;
    });

    return todo;
  }

  render() {
    this.$root.append(this.getRoot());
    this.instances.forEach(component => component.init());
    this.subscriber.subscribeComponents(this.instances);
  }

  destroy() {
    this.$root.html('');
    this.instances.forEach(component => component.destroy());
    this.observer.destroy();
    this.subscriber.unsubscribeFromStore();
  }
}
