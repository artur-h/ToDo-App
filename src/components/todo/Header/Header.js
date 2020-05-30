import {Component} from '@components/Component';

export class Header extends Component {
  static className = 'header';

  constructor($root) {
    super($root);
  }

  toHTML() {
    return `
      <div class="header__container">
        <div class="header__left-control">
          <div class="header__btn-wrapper">
            <button class="header__btn header__btn--left-control">
              <span class="material-icons-round">menu</span>
            </button>
            <button class="header__btn header__btn--left-control">
              <span class="material-icons-round">home</span>
            </button>
          </div>
          <div class="header__search-wrapper">
            <input 
              type="text" 
              id="find" 
              placeholder="Find" 
              class="header__input"
            >
            <label class="header__search-icon" for="find">
              <span class="material-icons-round">search</span>
            </label>
          </div>
        </div>
        <div class="header__right-control">
          <div class="header__btn-wrapper">
            <button class="header__btn header__btn--right-control">
              <span class="material-icons-round">add</span>
            </button>
            <button class="header__btn header__btn--right-control">
              <span class="material-icons-round">settings</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
