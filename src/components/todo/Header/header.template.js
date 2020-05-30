function toBtn(position) {
  const btnHTML = btnData.map(btn => {
    if (btn.position === position) {
      return `
        <button class="header__btn header__btn--${btn.position}-control">
          <span class="material-icons-round">${btn.data}</span>
        </button>
      `;
    }

    return '';
  });

  return btnHTML.join('');
}

const btnData = [
  {
    data: 'menu',
    position: 'left'
  },
  {
    data: 'home',
    position: 'left'
  },
  {
    data: 'add',
    position: 'right'
  },
  {
    data: 'settings',
    position: 'right'
  }
];

export function createHeader() {
  return `
      <div class="header__container">
        <div class="header__left-control">
          <div class="header__btn-wrapper">
            ${toBtn('left')}
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
            ${toBtn('right')}
          </div>
        </div>
      </div>
    `;
}
