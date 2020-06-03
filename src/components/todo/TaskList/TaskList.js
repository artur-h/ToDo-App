import {Component} from '@components/Component';
import {createTask, createTaskList} from './TaskList.template';
import {TaskEditor} from '@components/todo/TaskEditor/TaskEditor';
import {$} from '@core/Dom';

export class TaskList extends Component {
  static className = 'editor';

  constructor($root, options) {
    super($root, {
      ...options,
      name: 'TaskList',
      listeners: ['click']
    });

    this.taskListData = [];
    this.taskEditor = null;
  }

  init() {
    super.init();
    this.taskEditor = new TaskEditor(this.observer);

    this.on('TaskEditor: taskAdded', task => {
      this.renderAddedTask(task);
    });
  }

  toHTML(data = this.taskListData) {
    return createTaskList(data);
  }

  destroy() {
    super.destroy();

    this.destroySubComponent(this.taskEditor);
  }

  destroySubComponent(component) {
    if (!component.el.destroyed) {
      component.destroy();
    }
  }

  renderAddedTask(task) {
    this.taskListData.push(task);
    const renderedTask = createTask(task);
    const $taskEditor = $(this.$root.find('[data-type="task-editor"]'));
    $taskEditor.insertHtmlBefore(renderedTask);
  }

  completeTask(target) {
    const $task = $(target.closestType('task'));
    const id = $task.id;

    this.taskListData = this.taskListData.filter(item => item.id !== +id);
    $task.parent.removeChild($task);
  }

  onClick(event) {
    const target = $(event.target);

    if (target.closestAction('add-task')) {
      this.emit('TaskList: add-task', {});
    }

    if (target.closestAction('complete')) {
      this.completeTask(target);
    }
  }
}
