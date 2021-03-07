import { Book } from '../../../services/types';

/**
 * Action types
 * @UPDATE_FAVORITES update favorites
 * @REMOVE_FAVORITES remove favorites
 */
export enum FavoritesTypes {
  UPDATE_FAVORITES = '@favorites/UPDATE_FAVORITES',
  REMOVE_FAVORITES = '@favorites/REMOVE_FAVORITES',
}

/**
 * State type
 * @data : the book inserted by user
 */
export interface FavoritesState {
  data: Book[];
}
