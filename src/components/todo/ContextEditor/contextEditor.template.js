const priorityBtns = [
  {
    icon: 'flag',
    priority: 'p1'
  },
  {
    icon: 'flag',
    priority: 'p2'
  },
  {
    icon: 'flag',
    priority: 'p3'
  },
  {
    icon: 'outlined_flag',
    priority: 'p4'
  }
];

const menuBtns = [
  {
    icon: 'edit',
    text: 'Edit task',
    action: 'edit'
  },
  {
    icon: 'library_add',
    text: 'Duplicate',
    action: 'duplicate'
  },
  {
    icon: 'delete_forever',
    text: 'Delete task',
    action: 'delete'
  }
];

function creatPriorityBtns(btnData) {
  const html = btnData.map(btn => {
    return `
      <button class="priority__option">
        <span
          class="
            material-icons-round
            priority__icon
            priority__icon--${btn.priority}
          "
          data-priority="${btn.priority}"
        >${btn.icon}</span>
      </button>
    `;
  });

  return html.join('');
}

function createMenuBtn(action) {
  const btn = menuBtns.find(btn => btn.action === action);

  return `
    <tr class="context-editor__item" data-action="${btn.action}">
      <td class="context-editor__item-inner">
        <span 
          class="material-icons-round context-editor__icon"
        >${btn.icon}</span>
        <span class="context-editor__text">${btn.text}</span>
      </td>
    </tr>
  `;
}

function separator() {
  return `
    <tr>
      <td class="context-editor__separator">
        <div class="context-editor__separator-inner"></div>
      </td>
    </tr>
  `;
}

export function createContextEditor() {
  return `
    <table class="context-editor__body" cellpadding="0" cellspacing="0">
      ${createMenuBtn('edit')}
      ${separator()}
      <tr class="context-editor__item context-editor__item--no-hover">
        <td 
          class="
            context-editor__item-inner 
            context-editor__item-inner--wrapper
          "
        >
          <ul class="priority">
            <li class="priority__description">Priority</li>
            <li class="priority__list">
              ${creatPriorityBtns(priorityBtns)}
            </li>
          </ul>
        </td>
      </tr>
      ${separator()}
      ${createMenuBtn('duplicate')}
      ${separator()}
      ${createMenuBtn('delete')}
    </table>
  `;
}
