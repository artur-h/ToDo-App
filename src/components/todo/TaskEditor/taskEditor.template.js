export function createTaskEditor(mode) {
  return `
    <div 
      class="item-editor__details" 
      contenteditable="true"
      data-type="editor-input"
    ></div>
    <div class="item-editor__action">
      <button 
        type="submit"
        class="item-editor__submit"
        data-action="editor-${mode}"
        disabled
      >${mode === 'edit' ? 'Save' : 'Add Task'}</button>
      <button 
        type="button" 
        class="item-editor__cancel"
        data-action="cancel-${mode}"
      >Cancel</button>
    </div>
  `;
}
