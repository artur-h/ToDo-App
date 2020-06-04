import {$} from '@core/Dom';

export function renderContextEditor(root, target) {
  const CONTEXT_EDITOR_WIDTH = 250;
  const id = +target.id;
  const coords = target.coords;

  root.attr('data-type', 'context-editor');
  $(document.body).append(root);
  root.css({
    top: coords.bottom + 'px',
    left: coords.right - CONTEXT_EDITOR_WIDTH + 'px'
  });

  return {
    id,
    destroyed: false
  };
}

export function anotherBtnPressed(destroyed, currentTaskId, target) {
  return !destroyed && currentTaskId !== +target.id;
}

export function sameBtnPressed(destroyed) {
  return !destroyed;
}

export function triggered(event) {
  if (event.type === 'click') {
    const target = $(event.target);

    if (!target.closestType('context-editor')) {
      return true;
    }
  } else if (event.type === 'resize') {
    return true;
  }
}
