import { combineReducers } from 'redux';

import word from './word';
import favorites from './favorites';

export default combineReducers({
  word,
  favorites,
});
