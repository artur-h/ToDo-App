import {Component} from '@components/Component';
import {createHeader} from './header.template';

export class Header extends Component {
  static className = 'header';

  constructor($root) {
    super($root);
  }

  toHTML() {
    return createHeader();
  }
}
