import {Component} from '@components/Component';
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

    this.ADD_MODE = 'add-task';
    this.EDIT_MODE = 'edit';

    this.$listAddTaskBtn = null;
    this.$editorConfirmBtn = null;
    this.$input = null;
    this.destroyed = true;
    this.isEditing = false;
  }

  prepare() {
    this.on('add-task', () => this.render({mode: this.ADD_MODE}));
    this.on('ContextEditor: edit', task => this.editTask(task));
  }

  render(options) {
    if (this.isEditing) {
      $('[data-type="task-editor"]').before(this.currentEditTask);
      this.destroy(this.EDIT_MODE);
    } else if (!this.isEditing && !this.destroyed) {
      this.destroy();
    }

    super.init();

    const componentInfo = renderTaskEditor(this.$root, options);
    [this.$listAddTaskBtn,
      this.$editorConfirmBtn,
      this.$input,
      this.destroyed] = Object.values(componentInfo);
  }

  destroy(mode = 'add-task') {
    super.destroy();

    this.$input.textContent = '';
    this.$root.parent.removeChild(this.$root);
    this.destroyed = true;
    this.isEditing = false;

    if (mode === 'add-task') {
      this.$listAddTaskBtn.css({
        display: 'flex'
      });
    }

    this.emit('TaskEditor: destroy', {});
  }

  sendTaskInfo(customized = null) {
    const defaultTask = {
      content: this.$input.textContent,
      priority: 'p4',
      projectType: 'Inbox',
      id: Date.now()
    };

    this.emit('TaskEditor: render', customized || defaultTask);
  }

  setDefaultEditorView() {
    this.$input.textContent = '';
    this.$input.focus();
    this.$editorConfirmBtn.disabled = true;
  }

  editTask(task) {
    this.render({
      task,
      mode: this.EDIT_MODE
    });

    this.isEditing = true;
    this.editedTaskId = parseInt(task.id);
    this.currentEditTask = task;
    task.parent.removeChild(task);
  }

  onClick(event) {
    const target = $(event.target);

    if (target.action === 'cancel-add-task') {
      this.destroy();
    }

    if (target.action === 'cancel-edit') {
      $('[data-type="task-editor"]').before(this.currentEditTask);
      this.destroy(this.EDIT_MODE);
    }

    if (target.action === 'editor-add-task') {
      this.sendTaskInfo();
      this.setDefaultEditorView();
    }

    if (target.action === 'editor-edit') {
      this.sendTaskInfo({
        content: this.$input.textContent.trim(),
        id: this.editedTaskId
      });
      this.destroy(this.EDIT_MODE);
    }
  }

  onInput(event) {
    const target = $(event.target);

    this.$editorConfirmBtn.disabled = target.text() === '';
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (!this.$editorConfirmBtn.disabled && this.isEditing) {
        this.sendTaskInfo({
          content: this.$input.textContent.trim(),
          id: this.editedTaskId
        });
        this.destroy(this.EDIT_MODE);
      } else if (!this.$editorConfirmBtn.disabled) {
        this.sendTaskInfo();
        this.setDefaultEditorView();
      }
    }
  }
}
