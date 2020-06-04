import {Component} from '@components/Component';
import {createTask, createTaskList} from './TaskList.template';
import {TaskEditor} from '@TaskEditor/TaskEditor';
import {ContextEditor} from '@ContextEditor/ContextEditor';
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
    this.subComponents = [TaskEditor, ContextEditor];
  }

  init() {
    super.init();

    this.subComponents = this.subComponents.map(SubComponent => {
      return new SubComponent(this.observer);
    });

    this.on('TaskEditor: taskAdded', task => {
      this.renderNewTask(task);
    });
  }

  toHTML(data = this.taskListData) {
    return createTaskList(data);
  }

  destroy() {
    super.destroy();

    this.destroySubComponent();
  }

  destroySubComponent() {
    this.subComponents.forEach(subComponent => {
      if (!subComponent.destroyed) {
        subComponent.destroy();
      }
    });
  }

  renderNewTask(task) {
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

    if (target.closestAction('details')) {
      event.stopPropagation();
      const $target = $(target.closestAction('details'));
      this.emit('TaskList: task-details', $target);
    }
  }
}
