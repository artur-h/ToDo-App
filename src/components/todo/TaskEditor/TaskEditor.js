import {Component} from '@components/Component';
import {createTaskEditor} from '@TaskEditor/taskEditor.template';
import {renderTaskEditor} from '@TaskEditor/taskEditor.functions';
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

    this.$listAddTaskBtn = null;
    this.$editorAddTaskBtn = null;
    this.$input = null;
    this.destroyed = true;
  }

  prepare() {
    this.on('TaskList: add-task', () => this.render());

    this.$root.html(createTaskEditor());
  }

  render() {
    super.init();

    const componentInfo = renderTaskEditor(this.$root);
    [this.$listAddTaskBtn,
      this.$editorAddTaskBtn,
      this.$input,
      this.destroyed] = Object.values(componentInfo);
  }

  destroy() {
    super.destroy();

    this.$input.textContent = '';
    this.$root.parent.removeChild(this.$root);
    this.destroyed = true;

    this.$listAddTaskBtn.css({
      display: 'flex'
    });
  }

  sendNewTaskInfo() {
    const newTask = {
      content: this.$input.textContent,
      projectType: 'Inbox',
      id: Date.now()
    };

    this.emit('TaskEditor: taskAdded', newTask);
  }

  setDefaultEditorView() {
    this.$input.textContent = '';
    this.$input.focus();
    this.$editorAddTaskBtn.disabled = true;
  }

  onClick(event) {
    const target = $(event.target);

    if (target.action === 'cancel') {
      this.destroy();
    }

    if (target.action === 'editor-add-task') {
      this.sendNewTaskInfo();
      this.setDefaultEditorView();
    }
  }

  onInput(event) {
    const target = $(event.target);

    this.$editorAddTaskBtn.disabled = target.text() === '';
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (!this.$editorAddTaskBtn.disabled) {
        this.sendNewTaskInfo();
        this.setDefaultEditorView();
      }
    }
  }
}
