import {Component} from '@components/Component';
import {$} from '@core/Dom';
import {createContextEditor} from '@ContextEditor/contextEditor.template';
import {
  anotherBtnPressed,
  renderContextEditor,
  sameBtnPressed,
  triggered
} from '@ContextEditor/contextEditor.functions';

export class ContextEditor extends Component {
  constructor(observer) {
    super(
        $.create('div', 'context-editor'),
        {
          observer,
          name: 'ContextEditor',
          listeners: ['click']
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

      const editorInfo = renderContextEditor(this.$root, btn);
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

  onClick(event) {
    const $target = $(event.target);

    if ($target.closestData('action', 'edit')) {
      this.emit('ContextEditor: edit', this.$curentTask);
      this.destroy();
    }
  }
}
