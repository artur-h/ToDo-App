function taskTemplate({id, content, priority, projectType}) {
  return `
    <li 
      class="list__item" 
      data-type="task" 
      data-id="${id}" 
      data-priority="${priority}"
    >
      <div class="list__details">
        <div 
          class="list__check list__check--${priority}" 
          data-action="complete"
        >
          <span class="material-icons-round list__check-inner">done</span>
        </div>
        <div class="list__content">
          <div class="list__text" data-type="task-input">
            ${content}
          </div>
          <div class="list__bottom">
            <div class="list__project-info">
              <span class="list__project-name">
                 ${projectType}
              </span>
              <span class="list__project-color"></span>
            </div>
          </div>
        </div>
      </div>
      <button 
        class="list__action" 
        data-action="details" 
        data-id="${id}"
      >
        <span class="material-icons">more_horiz</span>
      </button>
    </li>
  `;
}

export function createTask(data) {
  if (Array.isArray(data)) {
    const tasks = data.map(taskTemplate);
    return tasks.join('');
  }

  return taskTemplate(data);
}

function createAddTask() {
  return `
    <li class="list__add-task" data-action="add-task">
      <div class="list__add-icon">
        <span class="material-icons list__add-icon-inner">add</span>
      </div>
      <span class="list__add-text">Add task</span>
    </li>
  `;
}

export function createTaskList(data) {
  const date = new Date();

  const formatter = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  });

  return `
    <div class="editor__container">
      <header class="editor__header">
        <h2 class="editor__heading">Today</h2>
        <span class="editor__date">${formatter.format(date)}</span>
      </header>
      <ul class="list">
        ${createTask(data)}
        ${createAddTask()}
      </ul>
    </div>
  `;
}
