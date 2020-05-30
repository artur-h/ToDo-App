import {$} from '@core/Dom';

export class Todo {
  constructor($root, components) {
    this.$root = $($root);
    this.components = components || [];
  }

  getRoot() {
    const root = [];

    this.components = this.components.map(Component => {
      const rootWrapper = $.create('div', Component.className);
      const component = new Component(rootWrapper);
      root.push(component.toHTML());
      return component;
    });

    return root.join('');
  }

  render() {
    this.$root.append(this.getRoot());
  }

  destroy() {

  }
}
