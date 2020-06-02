import {$} from '@core/Dom';

export function renderAddTask(root) {
  const $listAddTaskBtn = $(document.body
      .querySelector('[data-action="add-task"]'));

  $listAddTaskBtn.before(root);

  const $editorAddTaskBtn = root.find('[data-action="editor-add-task"]');
  $listAddTaskBtn.css({
    display: 'none'
  });

  const $input = root.find('[data-type="new-task-input"]');
  $input.focus();
  $editorAddTaskBtn.disabled = true;

  return {
    $listAddTaskBtn,
    $editorAddTaskBtn,
    $input,
    destroyed: false
  };
}
