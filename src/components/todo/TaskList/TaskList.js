import {Component} from '@components/Component';
import {createTask, createTaskList} from './TaskList.template';
import {TaskEditor} from '@TaskEditor/TaskEditor';
import {ContextEditor} from '@ContextEditor/ContextEditor';
import {prepareTask} from '@components/todo/TaskList/taskList.functions';
import {EmptyStatePlaceholder} from '@holder/EmptyStatePlaceholder';
import {$} from '@core/Dom';

export class TaskList extends Component {
  static className = 'editor';

  constructor($root, options) {
    super($root, {
      ...options,
      name: 'TaskList',
      subscribe: ['taskList'],
      listeners: ['click']
    });

    this.taskListData = [];
    this.subComponents = [TaskEditor, ContextEditor, EmptyStatePlaceholder];
  }

  init() {
    super.init();

    this.subComponents = this.subComponents.map(SubComponent => {
      return new SubComponent(this.observer, this.store);
    });

    this.renderEmptyStatePlaceholder();

    this.on('TaskEditor: destroy', () => {
      this.renderEmptyStatePlaceholder();
    });

    this.on('TaskEditor: render', newTask => {
      this.renderTask(newTask);
    });

    this.on('ContextEditor: duplicate', task => {
      this.duplicateTask(task);
    });

    this.on('ContextEditor: delete', task => {
      this.deleteTask(task);
    });

    this.on('ContextEditor: priority', data => {
      this.updatePriority(data);
    });
  }

  storeChanged(changes) {
    const taskList = Object.values(changes.taskList);
    this.$root.html(this.toHTML(taskList));
  }

  taskList() {
    return Object.values(this.store.getState().taskList);
  }

  toHTML(data = this.taskList()) {
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

  renderTask(newTask) {
    const renderedTask = createTask(prepareTask(newTask, this.taskListData));
    const $taskEditor = $(this.$root.find('[data-type="task-editor"]'));
    $taskEditor.insertHtmlBefore(renderedTask);
  }

  updatePriority(data) {
    const task = data.task;
    delete data.task;

    const renderedTask = createTask(prepareTask(data, this.taskListData));
    task.insertHtmlBefore(renderedTask);
    task.parent.removeChild(task);
  }

  completeTask(target) {
    const $task = $(target.closestData('type', 'task'));

    this.deleteTask($task);
  }

  duplicateTask(task) {
    let duplicateTask;

    this.taskListData.forEach((t, index, arr) => {
      if (t.id === task.id) {
        duplicateTask = {...t, ...{id: Date.now()}};
        arr.splice(index + 1, 0, duplicateTask);
      }
    });

    task.insertHtmlAfter(createTask(duplicateTask));
  }

  deleteTask(task) {
    this.taskListData = this.taskListData.filter(t => t.id !== task.id);
    task.parent.removeChild(task);
    this.renderEmptyStatePlaceholder();
  }

  renderEmptyStatePlaceholder() {
    if (this.taskList().length === 0) {
      this.emit('renderPlaceholder', {});
    }
  }

  onClick(event) {
    const target = $(event.target);

    if (target.closestData('action', 'add-task')) {
      this.emit('add-task', {});
      if (this.taskList().length === 0) {
        this.emit('destroyPlaceholder', {});
      }
    }

    if (target.closestData('action', 'complete')) {
      this.completeTask(target);
    }

    if (target.closestData('action', 'details')) {
      event.stopPropagation();
      const btn = $(target.closestData('action', 'details'));
      const task = $(target.closestData('type', 'task'));
      this.emit('TaskList: task-details', {
        task,
        btn
      });
    }
  }
}
