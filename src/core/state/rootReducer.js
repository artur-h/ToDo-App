import {
  UPDATE_TASK,
  CREATE_TASK,
  REMOVE_TASK,
  DUPLICATE_TASK
} from './types';

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
      return {
        ...state,
        taskList: removeTask(state, action)
      };
    case DUPLICATE_TASK:
      return {
        ...state,
        taskList: duplicateTask(state, action)
      };
    default: return state;
  }
}

function addNewTask(state, action) {
  const val = state.taskList || [];
  val.push(action.data);
  return val;
}

function updateTask(state, action) {
  let val = state.taskList || [];

  val = val.map(task => {
    return task.id === action.data.id ?
        {...task, [action.data.field]: action.data.updateInfo} :
        task;
  });

  return val;
}

function removeTask(state, action) {
  let val;

  state.taskList.forEach((task, index, arr) => {
    if (task.id === action.data.id) {
      arr.splice(index, 1);
      val = arr;
    }
  });

  return val;
}

function duplicateTask(state, action) {
  let val;

  state.taskList.forEach((t, index, arr) => {
    if (t.id === action.data.id) {
      const duplicateTask = {...t, ...{id: Date.now()}};
      arr.splice(index + 1, 0, duplicateTask);
      val = arr;
    }
  });

  return val;
}
