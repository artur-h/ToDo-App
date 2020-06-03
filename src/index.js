import './scss/index.scss';
import {Todo} from '@components/todo/Todo/Todo';
import {Header} from '@components/todo/Header/Header';
import {TaskList} from '@components/todo/TaskList/TaskList';

const todo = new Todo('#app', [Header, TaskList]);

todo.render();
