import {Component} from '@components/Component';
import {$} from '@core/Dom';
import {createContextEditor} from '@ContextEditor/contextEditor.template';
import {
  anotherBtnPressed,
  renderContextEditor,
  sameBtnPressed,
  triggered
} from '@ContextEditor/contextEditor.functions';
import {duplicateTask, updateTask} from '@core/state/actions';

export class ContextEditor extends Component {
  constructor(observer, store) {
    super(
        $.create('div', 'context-editor'),
        {
          observer,
          store,
          name: 'ContextEditor',
          listeners: ['click', 'mouseover']
        }
    );

    this.curentTaskId = null;
    this.$curentTask = null;
    this.destroyed = true;
  }
  
  prepare() {
    this.on('TaskList: task-details', data => this.render(data));

    this.$root.html(createContextEditor());
  }

  render({task, btn}) {
    this.$curentTask = task;

    if (anotherBtnPressed(this.destroyed, this.curentTaskId, btn)) {
      this.destroy();
      this.render({task, btn});
    } else if (sameBtnPressed(this.destroyed)) {
      this.destroy();
    } else {
      super.init();

      const editorInfo = renderContextEditor(this.$root, btn, task);
      [this.curentTaskId, this.destroyed] = Object.values(editorInfo);

      this.attachDestroyListeners();
    }
  }

  attachDestroyListeners() {
    this.triggerDestroy = this.triggerDestroy.bind(this);
    document.addEventListener('click', this.triggerDestroy);
    window.addEventListener('resize', this.triggerDestroy);
  }

  removeDestroyListeners() {
    document.removeEventListener('click', this.triggerDestroy);
    window.removeEventListener('resize', this.triggerDestroy);
  }

  destroy() {
    super.destroy();

    this.$root.parent.removeChild(this.$root);
    this.removeDestroyListeners();

    this.destroyed = true;
  }

  triggerDestroy(event) {
    if (triggered(event)) {
      this.destroy();
    }
  }

  changePriority($target) {
    this.emit('re-render', 'prepare');

    this.dispatch(updateTask({
      field: 'priority',
      updateInfo: $target.priority,
      id: this.$curentTask.id
    }));

    this.emit('re-render', 'finish');
  }

  onClick(event) {
    const $target = $(event.target);

    if ($target.closestData('action', 'edit')) {
      this.emit('ContextEditor: edit', this.$curentTask);
    }

    if ($target.closestData('action', 'duplicate')) {
      const id = this.$curentTask.id;
      this.dispatch(duplicateTask({id}));
    }

    if ($target.closestData('action', 'delete')) {
      const id = this.$curentTask.id;
      this.emit('ContextEditor: delete', id);
    }

    if ($target.priority) {
      if (this.$curentTask.priority !== $target.priority) {
        this.changePriority($target);
      }
    }

    this.destroy();
  }

  onMouseover(event) {
    const $target = $(event.target);

    if ($target.tooltip === 'show') {
      this.emit('ContextEditor: tooltip-over', $target);
    }
  }
}
