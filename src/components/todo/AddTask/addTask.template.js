export function addTask() {
  return `
    <div class="item-editor__details" contenteditable="true"></div>
    <div class="item-editor__action">
      <button 
        type="submit"
        class="item-editor__submit"
        disabled
      >Add Task</button>
      <button type="button" class="item-editor__cancel">Cancel</button>
    </div>
  `;
}
