import { SET_USER } from '../actions';

const initialAppState = {
  user: null,
};

export function app(state = initialAppState, action) {
  const { type, payload, error, meta } = action; // eslint-disable-line
  switch (type) {
    case SET_USER:
      return Object.assign({}, state, {
        user: payload.entry,
      });
    default:
      return state;
  }
}
