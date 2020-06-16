import {Component} from '@components/Component';
import {createHeader} from './header.template';

export class Header extends Component {
  static className = 'header';

  constructor($root, options) {
    super($root, {
      ...options,
      name: 'Header',
      subscribe: [],
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
