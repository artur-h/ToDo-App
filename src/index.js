import './scss/index.scss';
import {Todo} from '@components/todo/Todo/Todo';
import {Header} from '@components/todo/Header/Header';
import {TaskList} from '@components/todo/TaskList/TaskList';
import {Tooltip} from '@components/todo/Tooltip/Tooltip';
import {createStore} from '@core/state/createStore';
import {rootReducer} from '@core/state/rootReducer';
import {initialState} from '@core/state/initialState';
import {storage} from '@core/utils';

const store = createStore(rootReducer, initialState);

const todo = new Todo('#app', [Header, TaskList, Tooltip], store);

store.subscribe(state => storage('todo', JSON.stringify(state)));

todo.render();
