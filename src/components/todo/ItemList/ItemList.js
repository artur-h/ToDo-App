import {Component} from '@components/Component';

export class ItemList extends Component {
  static className = 'editor';

  constructor($root) {
    super($root);
  }

  toHTML() {
    return `
      <div class="editor__container">
        <header class="editor__header">
          <h2 class="editor__heading">Today</h2>
          <span class="editor__date">Tue 26 May</span>
        </header>
        <ul class="list">
          <li class="list__item">
            <div class="list__details">
              <div class="list__check">
                <span class="material-icons-round list__check-inner">done</span>
              </div>
              <div class="list__content">
                <div class="list__text" contenteditable="true">
                  Buy some milk after work
                </div>
                <div class="list__bottom">
                  <div class="list__project-info">
                    <span class="list__project-name">Inbox</span>
                    <span class="list__project-color"></span>
                  </div>
                </div>
              </div>
            </div>
            <button class="list__action">
              <span class="material-icons">more_horiz</span>
            </button>
          </li>
          <li class="list__item">
            <div class="list__details">
              <div class="list__check">
                <span class="material-icons-round list__check-inner">done</span>
              </div>
              <div class="list__content">
                <div class="list__text" contenteditable="true">
                  Prepare homework
                </div>
                <div class="list__bottom">
                  <div class="list__project-info">
                    <span class="list__project-name">Inbox</span>
                    <span class="list__project-color"></span>
                  </div>
                </div>
              </div>
            </div>
            <button class="list__action">
              <span class="material-icons">more_horiz</span>
            </button>
          </li>
          <li class="list__item">
            <div class="list__details">
              <div class="list__check">
                <span class="material-icons-round list__check-inner">done</span>
              </div>
              <div class="list__content">
                <div class="list__text" contenteditable="true">
                  Learn Spanish
                </div>
                <div class="list__bottom">
                  <div class="list__project-info">
                    <span class="list__project-name">Inbox</span>
                    <span class="list__project-color"></span>
                  </div>
                </div>
              </div>
            </div>
            <button class="list__action">
              <span class="material-icons">more_horiz</span>
            </button>
          </li>
          <li class="list__add-task">
            <div class="list__add-icon">
              <span class="material-icons list__add-icon-inner">add</span>
            </div>
            <span class="list__add-text">Add task</span>
          </li>
        </ul>
      </div>
    `;
  }
}
