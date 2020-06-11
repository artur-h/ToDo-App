export function showTooltip(target, root) {
  if (target.priority) {
    root.html(`
      Priority ${target.priority.slice(1)}
      <div class="tooltip__wrapper">
        <div class="tooltip__arrow"></div>
      </div>
    `);
  }

  root.css({
    display: 'block',
    top: target.coords.bottom + 'px',
    left: target.coords.left + 'px'
  });

  target.$el.onmouseout = () => {
    root.css({
      display: 'none'
    });

    target.$el.onmouseout = null;
  };

  target.$el.onclick = () => {
    root.css({
      display: 'none'
    });

    target.$el.onmouseout = null;
    target.$el.onclick = null;
  };
}
