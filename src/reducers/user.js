import { SET_USER } from '../actions/user';

const initialUserState = null;

export function user(state = initialUserState, action) {
  const { type, payload, error, meta } = action; // eslint-disable-line
  switch (type) {
    case SET_USER:
      return Object.assign({}, state, payload.entry);
    default:
      return state;
  }
}
