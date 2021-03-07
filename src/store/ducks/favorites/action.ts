import { action } from 'typesafe-actions';
import { Book } from '../../../services/types';
import { FavoritesTypes } from './types';

export const updateFavorites = (data: Book) =>
  action(FavoritesTypes.UPDATE_FAVORITES, data);

export const removeFavorites = (data: Book) =>
  action(FavoritesTypes.REMOVE_FAVORITES, data);
