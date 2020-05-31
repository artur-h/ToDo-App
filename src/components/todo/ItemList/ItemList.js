import {Component} from '@components/Component';
import {createItemList} from './itemList.template';
import {AddTask} from '@components/todo/AddTask/AddTask';
import {$} from '@core/Dom';

export class ItemList extends Component {
  static className = 'editor';

  constructor($root) {
    super($root, {
      name: 'ItemList',
      listeners: ['click', 'input']
    });
  }

  init() {
    super.init();
    this.initAddTask();
  }

  initAddTask() {
    const $addTaskBtn = this.$root.find('[data-action="add-task"]');
    const $addTaskRoot = $.create('li', 'item-editor');
    this.addTask = new AddTask($addTaskRoot, $addTaskBtn);
  }

  toHTML() {
    return createItemList();
  }

  onClick(event) {
    const target = $(event.target);

    if (target.closest('[data-action="add-task"]')) {
      // emit "addTask" event to all subscribers using Observer
    }
  }

  onInput(event) {
    console.log(event);
  }
}
