import {DomListener} from './DomListener';

export class Component extends DomListener {
  constructor($root) {
    super($root);
  }

  toHTML() {
    throw new Error('This method has to be rewritten');
  }
}
