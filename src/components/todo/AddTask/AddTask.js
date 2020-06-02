import {Component} from '@components/Component';
import {createAddTaskTemplate} from '@components/todo/AddTask/addTask.template';
import {renderAddTask} from '@components/todo/AddTask/addTask.functions';
import {$} from '@core/Dom';

export class AddTask extends Component {
  constructor(observer, itemListData) {
    super(
        $.create('li', 'item-editor'),
        {
          observer,
          name: 'AddTask',
          listeners: ['click', 'input']
        }
    );

    this.el = null;
    this.itemListData = itemListData;
  }

  prepare() {
    this.on('ItemList: add-task', () => this.render());
    this.on('ItemList: process completion', data => this.completeTask(data));

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

  completeTask(data) {
    const id = $(data.closestAction('complete')).id;

    this.itemListData = this.itemListData.filter(item => item.id !== +id);

    this.emit('AddTask: taskCompleted', this.itemListData);
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
      this.itemListData.push({
        content: this.el.$input.textContent,
        projectType: 'inbox',
        id: Date.now()
      });

      this.emit('AddTask: taskAdded', this.itemListData);
      this.render();
    }
  }

  onInput(event) {
    const target = $(event.target);

    this.el.$editorAddTaskBtn.disabled = target.text() === '';
  }
}
