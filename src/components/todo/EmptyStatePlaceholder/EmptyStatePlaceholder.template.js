export function createEmptyStatePlaceholder() {
  return `
    <div class="empty-state-placeholder__wrapper">
      <div class="empty-state-placeholder__img"></div>
      <p class="empty-state-placeholder__text">
        What tasks are on your mind?
      </p>
      <button 
        class="empty-state-placeholder__btn"
        data-action="placeholder-add-task"
      >Add a task</button>
    </div> 
  `;
}
