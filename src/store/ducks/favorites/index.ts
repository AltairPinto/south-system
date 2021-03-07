import { Reducer } from 'redux';
import { FavoritesState, FavoritesTypes } from './types';

const INITIAL_STATE: FavoritesState = {
  data:
    JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE || '') || '[]',
    ) || [],
};

const reducer: Reducer<FavoritesState> = (state = INITIAL_STATE, action) => {
  const updatedFavoritesState = state;

  switch (action.type) {
    case FavoritesTypes.UPDATE_FAVORITES:
      updatedFavoritesState.data.push(action.payload);
      localStorage.setItem(
        process.env.REACT_APP_LOCAL_STORAGE || '',
        JSON.stringify(updatedFavoritesState.data),
      );

      return { ...state, ...updatedFavoritesState };

    case FavoritesTypes.REMOVE_FAVORITES:
      const tempFavorites = updatedFavoritesState.data.indexOf(action.payload);
      updatedFavoritesState.data.splice(tempFavorites, 1);
      localStorage.setItem(
        process.env.REACT_APP_LOCAL_STORAGE || '',
        JSON.stringify(updatedFavoritesState.data),
      );
      if (!updatedFavoritesState.data.length) {
        localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE || '');
      }
      return { ...state, ...updatedFavoritesState };

    default:
      return state;
  }
};

export default reducer;
