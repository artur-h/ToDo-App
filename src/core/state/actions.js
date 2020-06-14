import {CHANGE_TEXT, CREATE_TASK, REMOVE_TASK} from '@core/state/types';

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  };
}

export function createTask(data) {
  return {
    type: CREATE_TASK,
    data
  };
}

export function removeTask(id) {
  return {
    type: REMOVE_TASK,
    id
  };
}
