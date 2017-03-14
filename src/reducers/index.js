import { config } from './config';
import { user } from './user';
import { combineReducers } from 'redux';

export const app = combineReducers({
  user,
  config,
});
