import {
  UPDATE_TASK,
  CREATE_TASK,
  REMOVE_TASK,
  DUPLICATE_TASK
} from '@core/state/types';

export function updateTask(data) {
  return {
    type: UPDATE_TASK,
    data
  };
}

export function createTask(data) {
  return {
    type: CREATE_TASK,
    data
  };
}

export function removeTask(data) {
  return {
    type: REMOVE_TASK,
    data
  };
}

export function duplicateTask(data) {
  return {
    type: DUPLICATE_TASK,
    data
  };
}
