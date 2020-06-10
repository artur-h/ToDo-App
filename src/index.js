import './scss/index.scss';
import {Todo} from '@components/todo/Todo/Todo';
import {Header} from '@components/todo/Header/Header';
import {TaskList} from '@components/todo/TaskList/TaskList';
import {Tooltip} from '@components/todo/Tooltip/Tooltip';

const todo = new Todo('#app', [Header, TaskList, Tooltip]);

todo.render();
