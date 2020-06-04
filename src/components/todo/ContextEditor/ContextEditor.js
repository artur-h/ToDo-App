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
    this.destroyed = true;
  }
  
  prepare() {
    this.on('TaskList: task-details', target => this.render(target));

    this.$root.html(createContextEditor());
  }

  render(target) {
    if (anotherBtnPressed(this.destroyed, this.curentTaskId, target)) {
      this.destroy();
      this.render(target);
    } else if (sameBtnPressed(this.destroyed)) {
      this.destroy();
    } else {
      super.init();

      const editorInfo = renderContextEditor(this.$root, target);
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
    console.log('ContextEditor:', event.target);
  }
}
