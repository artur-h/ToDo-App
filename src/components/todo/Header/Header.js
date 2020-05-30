import {Component} from '@components/Component';

export class Header extends Component {
  static className = 'header';

  constructor($root) {
    super($root);
  }

  toHTML() {
    return 'header';
  }
}
