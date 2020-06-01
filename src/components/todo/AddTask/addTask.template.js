export function createNewTask() {
  return `
    <div 
      class="item-editor__details" 
      contenteditable="true"
      data-type="new-task-input"
    ></div>
    <div class="item-editor__action">
      <button 
        type="submit"
        class="item-editor__submit"
        data-action="add-task"
        disabled
      >Add Task</button>
      <button 
        type="button" 
        class="item-editor__cancel"
        data-action="cancel"
      >Cancel</button>
    </div>
  `;
}
