import {$} from '@core/Dom';
import {creatPriorityBtns} from './contextEditor.template';

export function renderContextEditor(root, btn, task) {
  const CONTEXT_EDITOR_WIDTH = 250;
  const id = +btn.id;
  const coords = btn.coords;

  root.attr('data-type', 'context-editor');
  $(document.body).append(root);
  const priorityList = $(root.find('[data-type="priority-list"]'));
  priorityList.html(creatPriorityBtns(task.priority));

  root.css({
    top: coords.bottom + 'px',
    left: coords.right - CONTEXT_EDITOR_WIDTH + 'px'
  });

  return {
    id,
    destroyed: false
  };
}

export function anotherBtnPressed(destroyed, currentTaskId, btn) {
  return !destroyed && currentTaskId !== +btn.id;
}

export function sameBtnPressed(destroyed) {
  return !destroyed;
}

export function triggered(event) {
  if (event.type === 'click') {
    const target = $(event.target);

    if (!target.closestData('type', 'context-editor')) {
      return true;
    }
  } else if (event.type === 'resize') {
    return true;
  }
}
