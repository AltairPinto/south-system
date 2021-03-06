import { action } from 'typesafe-actions';
import { FavoritesTypes } from './types';

export const updateFavorites = (data: string) =>
  action(FavoritesTypes.UPDATE_FAVORITES, data);

export const removeFavorites = () => action(FavoritesTypes.REMOVE_FAVORITES);
