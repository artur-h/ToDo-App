import {UPDATE_TASK, CREATE_TASK, REMOVE_TASK} from './types';

export function rootReducer(state, action) {
  switch (action.type) {
    case CREATE_TASK:
      return {
        ...state,
        taskList: addNewTask(state, action)
      };
    case UPDATE_TASK:
      return {
        ...state,
        taskList: updateTask(state, action)
      };
    case REMOVE_TASK:
      delete state.taskList[action.id];
      return {...state};
    default: return state;
  }
}

function addNewTask(state, action) {
  const val = state.taskList || {};
  val[action.data.id] = action.data;
  return val;
}

function updateTask(state, action) {
  const val = state.taskList || {};

  val[action.data.id] = {
    ...val[action.data.id], 
    [action.data.field]: action.data.updateInfo
  };

  return val;
}
