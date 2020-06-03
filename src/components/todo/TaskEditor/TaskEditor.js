import {Component} from '@components/Component';
import {
  createTaskEditor} from '@components/todo/TaskEditor/taskEditor.template';
import {
  renderTaskEditor} from '@components/todo/TaskEditor/taskEditor.functions';
import {$} from '@core/Dom';

export class TaskEditor extends Component {
  constructor(observer) {
    super(
        $.create('li', 'item-editor'),
        {
          observer,
          name: 'TaskEditor',
          listeners: ['click', 'input', 'keydown']
        }
    );

    this.el = null;
  }

  prepare() {
    this.on('TaskList: add-task', () => this.render());

    this.$root.html(createTaskEditor());
  }

  render() {
    super.init();
    this.el = renderTaskEditor(this.$root);
  }

  destroy() {
    super.destroy();
    this.el.$input.textContent = '';
    this.$root.parent.removeChild(this.$root);
    this.el.destroyed = true;
  }

  sendNewTaskInfo() {
    const newTask = {
      content: this.el.$input.textContent,
      projectType: 'Inbox',
      id: Date.now()
    };

    this.emit('TaskEditor: taskAdded', newTask);
  }

  setDefaultEditorView() {
    this.el.$input.textContent = '';
    this.el.$input.focus();
    this.el.$editorAddTaskBtn.disabled = true;
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
      this.sendNewTaskInfo();
      this.setDefaultEditorView();
    }
  }

  onInput(event) {
    const target = $(event.target);

    this.el.$editorAddTaskBtn.disabled = target.text() === '';
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();

      this.sendNewTaskInfo();
      this.setDefaultEditorView();
    }
  }
}
