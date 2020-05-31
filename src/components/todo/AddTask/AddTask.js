import {Component} from '@components/Component';
import {addTask} from '@components/todo/AddTask/addTask.template';

export class AddTask extends Component {
  constructor($root, $addTaskBtn) {
    super($root, {
      name: 'AddTask',
      listeners: ['click']
    });
    this.$addTaskBtn = $addTaskBtn;
  }

  prepare() {
    // subscription to addTaskBtn click event using Observer
    // creating $root element
  }

  init() {
    this.createTemplate();
    super.init();
  }

  createTemplate() {
    this.$root.html(addTask());
    // this.$addTaskBtn.insertAdjacentHTML('beforebegin', addTask());
    // this.$addTaskBtn.style.display = 'none';
  }
}
