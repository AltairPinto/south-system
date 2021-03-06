import { createStore, applyMiddleware, Store } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { WordState } from './ducks/word/types';
import { FavoritesState } from './ducks/favorites/types';

import rootReducer from './ducks/rootReducer';

export interface ApplicationState {
  word: WordState;
  favorites: FavoritesState;
}
let middleware: any = [];

if (process.env.NODE_ENV === 'development') {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}

const store: Store<ApplicationState> = createStore(
  rootReducer,
  applyMiddleware(...middleware),
);

export default store;
