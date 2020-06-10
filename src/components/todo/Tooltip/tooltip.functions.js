export function showTooltip(target, root) {
  if (target.priority) {
    root.text('Priority ' + target.priority.slice(1));
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
