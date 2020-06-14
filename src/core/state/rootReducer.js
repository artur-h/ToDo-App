import {CHANGE_TEXT, CREATE_TASK, REMOVE_TASK} from './types';

export function rootReducer(state, action) {
  let field;

  switch (action.type) {
    case CREATE_TASK:
      field = 'taskList';
      return {
        ...state,
        taskList: value(state, field, action)
      };
    case CHANGE_TEXT:
      return {...state};
    case REMOVE_TASK:
      delete state.taskList[action.id];
      return {...state};
    default: return state;
  }
}

function value(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data;
  return val;
}
