import {$} from '@core/Dom';

export class Todo {
  constructor($root, components) {
    this.$root = $($root);
    this.components = components || [];
  }

  getRoot() {
    const todo = $.create('div', 'todo');

    this.components = this.components.map(Component => {
      const rootWrapper = $.create('div', Component.className);
      const component = new Component(rootWrapper);
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
  }
}
