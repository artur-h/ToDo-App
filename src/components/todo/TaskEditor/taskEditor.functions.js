import {$} from '@core/Dom';
import {createTaskEditor} from '@TaskEditor/taskEditor.template';
import {setEndOfContenteditable} from '@core/utils';

export function renderTaskEditor(root, options) {
  root.attr('data-type', 'task-editor');
  root.html(createTaskEditor(options.mode));

  let $listAddTaskBtn = null;

  if (options.mode === 'add-task') {
    $listAddTaskBtn = $('[data-action="add-task"]');
    $listAddTaskBtn.before(root);
    $listAddTaskBtn.css({
      display: 'none'
    });
  } else if (options.mode === 'edit') {
    options.task.before(root);
  }

  const $editorAddTaskBtn = root.find(`[data-action="editor-${options.mode}"]`);
  $editorAddTaskBtn.disabled = true;
  const $input = root.find('[data-type="editor-input"]');
  $input.focus();
  
  if (options.mode === 'edit') {
    const currentInput = $(options.task.find('[data-type="task-input"]'));
    $($input).text(currentInput.text());
    setEndOfContenteditable($input);
    $editorAddTaskBtn.disabled = false;
  }

  return {
    $listAddTaskBtn,
    $editorAddTaskBtn,
    $input,
    destroyed: false
  };
}
