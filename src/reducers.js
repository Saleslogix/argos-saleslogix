import { combineReducers } from 'redux';
import { SET_USER } from './actions';

const initialAppState = {
  user: null,
};

function app(state = initialAppState, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        user: action.entry,
      });
    default:
      return state;
  }
}

const crmApp = combineReducers({
  app,
});

export default crmApp;
