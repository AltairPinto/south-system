import { Reducer } from 'redux';
import { FavoritesState, FavoritesTypes } from './types';

const data = JSON.parse(
  localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE || '[]') || '',
);

const INITIAL_STATE: FavoritesState = {
  data: data,
};

const reducer: Reducer<FavoritesState> = (state = INITIAL_STATE, action) => {
  const updatedFavoritesState = state;

  switch (action.type) {
    case FavoritesTypes.UPDATE_FAVORITES:
      updatedFavoritesState.data = action.payload;
      localStorage.setItem(
        process.env.REACT_APP_LOCAL_STORAGE || '',
        JSON.stringify(action.payload),
      );

      return { ...state, ...updatedFavoritesState };

    case FavoritesTypes.REMOVE_FAVORITES:
      INITIAL_STATE.data = [];
      localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE || '');

      return { ...state, ...INITIAL_STATE };

    default:
      return state;
  }
};

export default reducer;
