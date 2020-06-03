export function createContextEditor() {
  return `
    <div class="context-editor">
      <table class="context-editor__body" cellpadding="0" cellspacing="0">
        <tr class="context-editor__item">
          <td class="context-editor__item-inner">
            <span class="material-icons-round context-editor__icon">edit</span>
            <span class="context-editor__text">Edit task</span>
          </td>
        </tr>
        <tr>
          <td class="context-editor__separator">
            <div class="context-editor__separator-inner"></div>
          </td>
        </tr>
        <tr class="context-editor__item context-editor__item--no-hover">
          <td 
            class="
              context-editor__item-inner 
              context-editor__item-inner--wrapper
            "
          >
            <ul class="priority">
              <li class="priority__description">Priority</li>
              <li class="priority__list">
                <button class="priority__option">
                  <span
                    class="
                      material-icons-round
                      priority__icon
                      priority__icon--p1
                    "
                  >flag</span>
                </button>
                <button class="priority__option">
                  <span
                    class="
                      material-icons-round
                      priority__icon
                      priority__icon--p2
                    "
                  >flag</span>
                </button>
                <button class="priority__option">
                  <span
                    class="
                      material-icons-round
                      priority__icon
                      priority__icon--p3
                    "
                  >flag</span>
                </button>
                <button class="priority__option">
                  <span
                    class="
                      material-icons-round
                      priority__icon
                      priority__icon--p4
                    "
                  >outlined_flag</span>
                </button>
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td class="context-editor__separator">
            <div class="context-editor__separator-inner"></div>
          </td>
        </tr>
        <tr class="context-editor__item">
          <td class="context-editor__item-inner">
            <span 
              class="material-icons-round context-editor__icon"
            >library_add</span>
            <span class="context-editor__text">Duplicate</span>
          </td>
        </tr>
        <tr>
          <td class="context-editor__separator">
            <div class="context-editor__separator-inner"></div>
          </td>
        </tr>
        <tr class="context-editor__item">
          <td class="context-editor__item-inner">
            <span 
              class="material-icons-round context-editor__icon"
            >delete_forever</span>
            <span class="context-editor__text">Delete task</span>
          </td>
        </tr>
      </table>
    </div>
  `;
}
