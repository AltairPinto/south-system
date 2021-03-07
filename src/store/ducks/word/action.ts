import { action } from 'typesafe-actions';
import { WordTypes } from './types';

export const updateWord = (data: string) => action(WordTypes.UPDATE_WORD, data);

export const removeWord = () => action(WordTypes.REMOVE_WORD);
