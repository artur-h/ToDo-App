const defaultProjectType = 'inbox';

export function createItem(data) {
  const items = data.map(item => {
    return `
      <li class="list__item">
        <div class="list__details">
          <div class="list__check">
            <span class="material-icons-round list__check-inner">done</span>
          </div>
          <div class="list__content">
            <div class="list__text" contenteditable="true">
              ${item.content}
            </div>
            <div class="list__bottom">
              <div class="list__project-info">
                <span class="list__project-name">
                   ${item.projectType}
                </span>
                <span class="list__project-color"></span>
              </div>
            </div>
          </div>
        </div>
        <button class="list__action">
          <span class="material-icons">more_horiz</span>
        </button>
      </li>
    `;
  });

  items.push(`
    <li class="list__add-task" data-action="add-task">
      <div class="list__add-icon">
        <span class="material-icons list__add-icon-inner">add</span>
      </div>
      <span class="list__add-text">Add task</span>
    </li>
  `);

  return items.join('');
}

const data = [
  {
    content: 'Buy some milk after work',
    projectType: defaultProjectType
  },
  {
    content: 'Prepare homework',
    projectType: defaultProjectType
  },
  {
    content: 'Learn Spanish',
    projectType: defaultProjectType
  }
];

export function createItemList() {
  return `
    <div class="editor__container">
      <header class="editor__header">
        <h2 class="editor__heading">Today</h2>
        <span class="editor__date">Tue 26 May</span>
      </header>
      <ul class="list">
        ${createItem(data)}
      </ul>
    </div>
  `;
}
