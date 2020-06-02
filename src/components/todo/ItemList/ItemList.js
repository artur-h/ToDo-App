import {Component} from '@components/Component';
import {createItemList} from './itemList.template';
import {AddTask} from '@components/todo/AddTask/AddTask';
import {$} from '@core/Dom';

export class ItemList extends Component {
  static className = 'editor';

  constructor($root, options) {
    super($root, {
      ...options,
      name: 'ItemList',
      listeners: ['click']
    });

    this.itemListData = [];
  }

  init() {
    super.init();
    this.addTask = new AddTask(this.observer, this.itemListData);

    this.on('AddTask: taskAdded', data => {
      this.updateItemList(data);
    });

    this.on('AddTask: taskCompleted', data => {
      this.updateItemList(data);
    });
  }

  toHTML(data = this.itemListData) {
    return createItemList(data);
  }

  destroy() {
    super.destroy();

    this.destroyComponent(this.addTask);
  }

  destroyComponent(component) {
    if (!component.el.destroyed) {
      component.destroy();
    }
  }

  updateItemList(data = null) {
    this.itemListData = data;

    this.destroyComponent(this.addTask);

    this.$root.text('');
    const content = this.toHTML(this.itemListData);
    this.$root.html(content);
  }

  onClick(event) {
    const target = $(event.target);

    if (target.closestAction('add-task')) {
      this.emit('ItemList: add-task', {});
    }

    if (target.closestAction('complete')) {
      this.emit('ItemList: process completion', target);
    }
  }
}
