import { config } from './config';
import { user } from './user';

export const app = Redux.combineReducers({
  user,
  config,
});
