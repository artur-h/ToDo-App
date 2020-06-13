import {Component} from '@components/Component';
import {showTooltip} from '@components/todo/Tooltip/tooltip.functions';

export class Tooltip extends Component {
  static className = 'tooltip';

  constructor($root, options) {
    super($root, {
      ...options, 
      subscribe: [],
      name: 'Tooltip'
    });
  }

  toHTML() {
    return `
      <div class="tooltip__wrapper">
        <div class="tooltip__arrow"></div>
      </div>
    `;
  }

  init() {
    super.init();

    this.on('ContextEditor: tooltip-over', target => {
      this.show(target);
    });
  }

  destroy() {
    super.destroy();
  }

  show($target) {
    showTooltip($target, this.$root);
  }
}
