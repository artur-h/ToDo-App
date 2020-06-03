import {$} from '@core/Dom';

export function renderTaskEditor(root) {
  root.attr('data-type', 'task-editor');

  const $listAddTaskBtn = $('[data-action="add-task"]');
  $listAddTaskBtn.before(root);
  $listAddTaskBtn.css({
    display: 'none'
  });

  const $editorAddTaskBtn = root.find('[data-action="editor-add-task"]');
  const $input = root.find('[data-type="new-task-input"]');

  $editorAddTaskBtn.disabled = true;
  $input.focus();

  return {
    $listAddTaskBtn,
    $editorAddTaskBtn,
    $input,
    destroyed: false
  };
}
