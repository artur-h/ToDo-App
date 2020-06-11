import {storage} from '@core/utils';

const defaultState = {
  taskList: []
};

export const initialState = storage('todo') ? storage('todo') : defaultState;
