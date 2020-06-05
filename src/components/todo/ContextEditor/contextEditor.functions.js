import {$} from '@core/Dom';

export function renderContextEditor(root, btn) {
  const CONTEXT_EDITOR_WIDTH = 250;
  const id = +btn.id;
  const coords = btn.coords;

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
