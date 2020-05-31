import {Component} from '@components/Component';
import {createHeader} from './header.template';

export class Header extends Component {
  static className = 'header';

  constructor($root) {
    super($root, {
      name: 'Header',
      listeners: ['click']
    });
  }

  init() {
    super.init();
  }

  toHTML() {
    return createHeader();
  }

  onClick(event) {
    console.log(event.target, 'Header');
  }
}
