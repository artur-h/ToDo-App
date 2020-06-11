import {$} from '@core/Dom';
import {
  createEmptyStatePlaceholder
} from '@holder/EmptyStatePlaceholder.template';

export function renderEmptyStatePlaceholder(root) {
  root.attr('data-type', 'empty-state-placeholder');
  root.html(createEmptyStatePlaceholder());

  const container = $(document.body
      .querySelector('[data-type="task-list-container"]'));

  container.append(root);
}
