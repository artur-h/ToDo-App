import {Component} from '@components/Component';
import {$} from '@core/Dom';
import {
  renderEmptyStatePlaceholder
} from '@holder/EmptyStatePlaceholder.functions';

export class EmptyStatePlaceholder extends Component {
  constructor(observer) {
    super(
        $.create('div', 'empty-state-placeholder'),
        {
          observer,
          name: 'EmptyStatePlaceholder',
          listeners: ['click']
        }
    );

    this.destroyed = true;
  }

  prepare() {
    this.on('renderPlaceholder', () => this.render());
    this.on('destroyPlaceholder', () => this.destroy());
  }

  render() {
    super.init();

    renderEmptyStatePlaceholder(this.$root);
    this.destroyed = false;
  }

  destroy() {
    super.destroy();

    const holder = $(document.body
        .querySelector('[data-type="empty-state-placeholder"]'));

    holder.parent.removeChild(holder);

    this.destroyed = true;
  }

  onClick(event) {
    const target = $(event.target);

    if (target.closestData('action', 'placeholder-add-task')) {
      this.emit('add-task', {});
      this.destroy();
    }
  }
}
