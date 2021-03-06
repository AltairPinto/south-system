/**
 * Action types
 * @UPDATE_WORD update word
 * @REMOVE_WORD remove word
 */
export enum WordTypes {
  UPDATE_WORD = '@word/UPDATE_WORD',
  REMOVE_WORD = '@word/REMOVE_WORD',
}

/**
 * State type
 * @data : the word inserted by user
 */
export interface WordState {
  data: string;
}
