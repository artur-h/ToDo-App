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
  }

  init() {
    super.init();
    this.addTask = new AddTask(this.observer);
  }

  toHTML() {
    return createItemList();
  }

  destroy() {
    super.destroy();

    if (!this.addTask.destroyed) {
      this.addTask.close();
    }
  }

  onClick(event) {
    const target = $(event.target);

    if (target.closest('[data-action="add-task"]')) {
      this.emit('ItemList: add-task', {});
    }
  }
}
