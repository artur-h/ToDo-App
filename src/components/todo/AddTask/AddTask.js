import {Component} from '@components/Component';
import {createAddTaskTemplate} from '@components/todo/AddTask/addTask.template';
import {renderAddTask} from '@components/todo/AddTask/addTask.functions';
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

    this.el = null;
  }

  prepare() {
    this.on('ItemList: add-task', () => this.render());
    this.$root.html(createAddTaskTemplate());
  }

  render() {
    super.init();
    this.el = renderAddTask(this.$root);
  }

  destroy() {
    super.destroy();
    this.el.$input.textContent = '';
    this.$root.parent.removeChild(this.$root);
    this.el.destroyed = true;
  }

  onClick(event) {
    const target = $(event.target);

    if (target.action === 'cancel') {
      this.destroy();

      this.el.$listAddTaskBtn.css({
        display: 'flex'
      });
    }

    if (target.action === 'editor-add-task') {
      this.emit('AddTask: add-task', {
        content: this.el.$input.textContent,
        projectType: 'inbox'
      });
      this.destroy();
      this.render();
    }
  }

  onInput(event) {
    const target = $(event.target);

    this.el.$editorAddTaskBtn.disabled = target.text() === '';
  }
}
