import {Component} from '@components/Component';
import {createNewTask} from '@components/todo/AddTask/addTask.template';
import {$} from '@core/Dom';

export class AddTask extends Component {
  constructor(observer) {
    super(
        $.create('li', 'item-editor'),
        {
          observer,
          name: 'AddTask',
          listeners: ['click', 'input']
        }
    );

    this.$addTaskBtn = $(document.body
        .querySelector('[data-action="add-task"]'));
    this.destroyed = true;
  }

  prepare() {
    this.on('ItemList: add-task', () => this.render());
    this.$root.html(createNewTask());
  }

  render() {
    super.init();

    this.$addTaskBtn.before(this.$root);

    this.$addTaskBtn.css({
      display: 'none'
    });

    const input = this.$root.find('[data-type="new-task-input"]');
    input.focus();

    this.destroyed = false;
  }

  destroy() {
    super.destroy();
    this.$root.parent.removeChild(this.$root);
    this.destroyed = true;
  }

  onClick(event) {
    const target = $(event.target);

    if (target.action === 'cancel') {
      this.destroy();

      this.$addTaskBtn.css({
        display: 'flex'
      });
    }
  }

  onInput() {
    console.log('AddTask: input');
  }
}
