import {$} from '@core/Dom';
import {Observer} from '@core/Observer';

export class Todo {
  constructor($root, components) {
    this.$root = $($root);
    this.components = components || [];
    this.observer = new Observer();
  }

  getRoot() {
    const todo = $.create('div', 'todo');

    const options = {
      observer: this.observer
    };

    this.components = this.components.map(Component => {
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
    this.components.forEach(component => component.init());
  }

  destroy() {
    this.$root.html('');
    this.components.forEach(component => component.destroy());
    this.observer.destroy();
  }
}
