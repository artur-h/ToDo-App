import {Component} from '@components/Component';
import {createItemList} from './itemList.template';

export class ItemList extends Component {
  static className = 'editor';

  constructor($root) {
    super($root);
  }

  toHTML() {
    return createItemList();
  }
}
