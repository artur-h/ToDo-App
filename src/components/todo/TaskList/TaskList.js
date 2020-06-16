import {Component} from '@components/Component';
import {TaskEditor} from '@TaskEditor/TaskEditor';
import {ContextEditor} from '@ContextEditor/ContextEditor';
import {EmptyStatePlaceholder} from '@holder/EmptyStatePlaceholder';
import {$} from '@core/Dom';
import {removeTask} from '@actions';
import {createTaskList} from '@components/todo/TaskList/TaskList.template';

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

  get taskList() {
    return this.store.getState().taskList;
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

    this.on('ContextEditor: delete', data => {
      this.removeTask(data);
    });
  }

  storeChanged(changes) {
    this.$root.html(this.toHTML(changes.taskList));
  }

  toHTML(data = this.taskList) {
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

  removeTask(id) {
    this.emit('re-render', 'prepare');

    this.dispatch(removeTask({id}));

    this.emit('re-render', 'finish');
  }

  renderEmptyStatePlaceholder() {
    if (this.taskList.length === 0) {
      this.emit('renderPlaceholder', {});
    }
  }

  onClick(event) {
    const target = $(event.target);

    if (target.closestData('action', 'add-task')) {
      this.emit('add-task', {});
      if (this.taskList.length === 0) {
        this.emit('destroyPlaceholder', {});
      }
    }

    if (target.closestData('action', 'complete')) {
      const id = $(target.closestData('action', 'complete')).id;
      this.removeTask(id);
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
