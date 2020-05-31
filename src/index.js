import './scss/index.scss';
import {Todo} from '@components/todo/Todo/Todo';
import {Header} from '@components/todo/Header/Header';
import {ItemList} from '@components/todo/ItemList/ItemList';

const todo = new Todo('#app', [Header, ItemList]);

todo.render();
