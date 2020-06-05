import {$} from '@core/Dom';
import {createTaskEditor} from '@TaskEditor/taskEditor.template';
import {setEndOfContenteditable} from '@core/utils';

export function renderTaskEditor(root, options) {
  root.attr('data-type', 'task-editor');
  root.html(createTaskEditor(options.mode));

  let $listAddTaskBtn = null;
  $listAddTaskBtn = insertEditorBefore(root, $listAddTaskBtn, options);

  const $editorConfirmBtn = root.find(`[data-action="editor-${options.mode}"]`);
  $editorConfirmBtn.disabled = true;
  const $input = root.find('[data-type="editor-input"]');
  $input.focus();
  
  if (options.mode === 'edit') {
    const currentInput = $(options.task.find('[data-type="task-input"]'));
    $($input).text(currentInput.text());
    setEndOfContenteditable($input);
    $editorConfirmBtn.disabled = false;
  }

  return {
    $listAddTaskBtn,
    $editorConfirmBtn,
    $input,
    destroyed: false
  };
}

function insertEditorBefore(root, listBtn, options) {
  if (options.mode === 'add-task') {
    listBtn = $('[data-action="add-task"]');
    listBtn.before(root);
    listBtn.css({
      display: 'none'
    });

    return listBtn;
  } else if (options.mode === 'edit') {
    options.task.before(root);

    return null;
  }
}
