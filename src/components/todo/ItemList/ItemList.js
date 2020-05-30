import {Component} from '@components/Component';

export class ItemList extends Component {
  static className = 'editor';

  constructor($root) {
    super($root);
  }

  toHTML() {
    return 'editor';
  }
}
