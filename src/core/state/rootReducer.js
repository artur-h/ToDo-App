import {CREATE_TASK} from '@core/state/types';

export function rootReducer(state, action) {
  switch (action.type) {
    case CREATE_TASK:
      return {...state};
    default: return state;
  }
}
