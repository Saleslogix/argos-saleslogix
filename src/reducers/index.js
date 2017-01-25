import { SET_USER } from '../actions';

const initialAppState = {
  user: null,
};

export function app(state = initialAppState, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        user: action.entry,
      });
    default:
      return state;
  }
}
