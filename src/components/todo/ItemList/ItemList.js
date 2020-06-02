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
    this.addTask = new AddTask(this.observer);

    this.on('AddTask: add-task', data => {
      this.updateItemList(data);
    });
  }

  toHTML(data = this.itemListData) {
    return createItemList(data);
  }

  destroy() {
    super.destroy();

    if (!this.addTask.destroyed) {
      this.addTask.close();
    }
  }

  updateItemList(data) {
    this.itemListData.push(data);
    this.$root.text('');
    const content = this.toHTML(this.itemListData);
    this.$root.html(content);
  }

  onClick(event) {
    const target = $(event.target);

    if (target.closest('[data-action="add-task"]')) {
      this.emit('ItemList: add-task', {});
    }
  }
}
