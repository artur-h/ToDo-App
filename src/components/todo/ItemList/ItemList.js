import {Component} from '@components/Component';
import {createItemList} from './itemList.template';

export class ItemList extends Component {
  static className = 'editor';

  constructor($root) {
    super($root, {
      name: 'ItemList',
      listeners: ['click', 'input']
    });
    this.$root = $root;
  }

  init() {
    super.init();
  }

  toHTML() {
    return createItemList();
  }

  onClick(event) {
    console.log(event.target, 'ItemList');
  }

  onInput() {}
}
