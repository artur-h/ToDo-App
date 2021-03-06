import {Component} from '@components/Component';
import {
  renderTaskEditor,
  taskListIsEmpty
} from '@TaskEditor/taskEditor.functions';
import {setEndOfContenteditable} from '@core/utils';
import {$} from '@core/Dom';
import {createTask, updateTask} from '@core/state/actions';

export class TaskEditor extends Component {
  constructor(observer, store) {
    super(
        $.create('li', 'item-editor'),
        {
          observer,
          store,
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
    this.on('add-task', () => this.render());
    this.on('ContextEditor: edit', task => this.editTask(task));
    this.on('re-render', phase => this.reRender(phase));
  }

  render(options = {mode: this.ADD_MODE}) {
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

  destroy(mode = this.ADD_MODE) {
    super.destroy();

    this.$input.textContent = '';
    this.$root.parent.removeChild(this.$root);
    this.destroyed = true;
    this.isEditing = false;

    if (mode === this.ADD_MODE) {
      this.$listAddTaskBtn.css({
        display: 'flex'
      });
    }

    this.emit('TaskEditor: destroy', {});
  }

  reRender(phase) {
    if (phase === 'prepare') {
      if (this.destroyed === false) {
        this.currentText = this.$input.textContent;
        this.reRenderStatus = 'prepared';

        if (this.isEditing) {
          this.destroy(this.EDIT_MODE);
          this.reRenderEditMode = true;
        } else {
          this.destroy();
        }
      }
    } else if (phase === 'finish') {
      if (this.reRenderStatus === 'prepared') {
        if (this.reRenderEditMode) {
          const tasks = $(document.body).findAll('[data-type="task"]');
          let task;
          tasks.forEach(t => {
            if (+t.dataset.id === this.editedTaskId) task = $(t);
          });
          
          this.editTask(task);
          this.reRenderEditMode = false;
        } else {
          this.render();
        }

        this.$input.textContent = this.currentText;
        setEndOfContenteditable(this.$input);

        if (this.$input.textContent) this.$editorConfirmBtn.disabled = false;

        this.reRenderStatus = 'finished';
      }
    }

    if (taskListIsEmpty(this.store, this.destroyed)) {
      this.emit('renderPlaceholder', {});
    }
  }

  addTask() {
    this.dispatch(createTask(this.defaultTask()));
    this.setDefaultEditorView();
    this.render();
  }

  updateTask({field, updateInfo, id}) {
    this.dispatch(updateTask({
      field,
      updateInfo,
      id
    }));
  }

  defaultTask() {
    return {
      content: this.$input.textContent.trim(),
      priority: 'p4',
      projectType: 'Inbox',
      id: Date.now()
    };
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
      this.addTask();
    }

    if (target.action === 'editor-edit') {
      this.updateTask({
        field: 'content',
        updateInfo: this.$input.textContent.trim(),
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
        this.updateTask({
          field: 'content',
          updateInfo: this.$input.textContent.trim(),
          id: this.editedTaskId
        });
        this.destroy(this.EDIT_MODE);
      } else if (!this.$editorConfirmBtn.disabled) {
        this.addTask();
      }
    }

    if (event.key === 'Escape') {
      if (this.isEditing) {
        $('[data-type="task-editor"]').before(this.currentEditTask);
        this.destroy(this.EDIT_MODE);
      } else {
        this.destroy();
      }
    }
  }
}
